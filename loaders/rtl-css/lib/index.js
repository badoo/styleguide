/*!
 * Copyright (C) 2015 by Yuriy Nasretdinov
 *
 * See license text in LICENSE file
 */

(function() {
    const RTL_BEGIN = '/* @rtl begin */';
    const RTL_END = '/* @rtl end */';

    const LTR_BEGIN = '/* @ltr begin */';
    const LTR_END = '/* @ltr end */';

    const NOFLIP_BEGIN = '/* @noflip begin */';
    const NOFLIP_END = '/* @noflip end */';

    const LTR_TRIM_RX = /\/\* @(ltr begin|ltr end|noflip begin|noflip end) \*\//g;

    const SECTIONS_MARKERS = [[NOFLIP_BEGIN, NOFLIP_END], [RTL_BEGIN, RTL_END]];

    function trim(str) {
        return str.replace(/(^\s+|\s+$)/g, '');
    }

    // parse rules object and form the config that is usable for processing
    function processRTLConfig(config) {
        const properties = config.properties;
        if (!properties) {
            throw new Error("Invalid config: section 'properties' is missing");
        }

        const values = config.values;
        if (!values) {
            throw new Error("Invalid config: section 'values' is missing");
        }

        const dynamic = {};
        for (let i = 0; i < values.length; i++) {
            const elem = values[i];
            const elem_parts = elem.split('=', 2);
            const key = elem_parts[0];
            const replace = elem_parts[1];

            const key_parts = key.split(':', 2);
            if (key_parts.length != 2) {
                throw new Error(
                    `Invalid config: incorrect 'values' rule: ':' expected in key for ${i}`
                );
            }

            const rule = trim(key_parts[0]);
            const pattern_parts = trim(key_parts[1]).split(/\s+/g);

            if (!dynamic[rule]) {
                dynamic[rule] = {};
            }
            if (!dynamic[rule][pattern_parts.length]) {
                dynamic[rule][pattern_parts.length] = [];
            }

            dynamic[rule][pattern_parts.length].push({
                pattern: pattern_parts,
                replace: trim(replace),
            });
        }

        return { dynamic, options: config.options, properties: config.properties };
    }

    /*
	 * For LTR we do not need to do any automatic replaces, we just need to get rid of sections between
	 * RTL_BEGIN and RTL_END
	 *
	 * algorithm does not use regular expressions to archieve maximum perfomance
	 */
    function processLTR(contents) {
        const parts = contents.split(RTL_BEGIN);
        const response = [parts[0]];
        for (let i = 1; i < parts.length; i++) {
            const v = parts[i];
            const end_pos = v.indexOf(RTL_END);
            if (end_pos < 0) {
                continue;
            }
            response.push(v.substr(end_pos + RTL_END.length));
        }

        return response.join('').replace(LTR_TRIM_RX, '');
    }

    /*
	 * For RTL we need to get rid of sections between LTR_BEGIN and LTR_END and apply flip-replaces.
	 * These replaces must ignore sections between NOFLIP_BEGIN and NOFLIP_END as well as RTL_BEGIN and RTL_END
	 */
    function processCss(config, direction, contents) {
        if (direction == 'ltr') {
            return processLTR(contents);
        }

        let i;
        let j;
        let v;
        let end_pos;
        let raw_cnt = 0;
        let parts = contents.split(LTR_BEGIN);
        let response_arr = [parts[0]];
        for (i = 1; i < parts.length; i++) {
            v = parts[i];
            end_pos = v.indexOf(LTR_END);
            if (end_pos < 0) {
                continue;
            }
            response_arr.push(v.substr(end_pos + LTR_END.length));
        }

        /* sections that do not need to be replaced */
        const raw_sections = {
            // key => value
        };

        for (i = 0; i < SECTIONS_MARKERS.length; i++) {
            const m = SECTIONS_MARKERS[i];
            parts = response_arr.join('').split(m[0]);
            response_arr = [parts[0]];
            for (j = 1; j < parts.length; j++) {
                v = parts[j];
                end_pos = v.indexOf(m[1]);
                if (end_pos < 0) {
                    continue;
                }
                const raw_v = v.substr(0, end_pos);
                const raw_k = `raw_${raw_cnt++};`;
                raw_sections[raw_k] = raw_v;
                response_arr.push(raw_k);
                response_arr.push(v.substr(end_pos + m[1].length));
            }
        }

        let response = processRTL(config, response_arr.join(''));

        for (const from in raw_sections) {
            response = response.replace(from, raw_sections[from]);
        }

        return response;
    }

    function processSimpleRTLRule(value_raw, patterns, value_suffixes) {
        let value = value_raw.replace(/\s+$/g, '');
        let k;
        let v;
        let i;

        // cut suffix from values

        for (k in value_suffixes) {
            const suffix = value_suffixes[k];
            if (value.indexOf(suffix, value.length - suffix.length) !== -1) {
                value = value.slice(0, -suffix.length);
                value = value.replace(/\s+$/g, '');
            }
        }

        let len = value.length - value_raw.length;
        const value_suffix = len ? value_raw.substr(len) : '';
        const ltrimmed = value.replace(/^\s+/g, '');

        len = value.length - ltrimmed.length;
        const value_prefix = len ? value.substr(0, len) : '';

        const value_parts = ltrimmed.split(/\s+/g);

        if (!patterns[value_parts.length]) {
            return false;
        }

        const my_patterns = patterns[value_parts.length];

        upper_loop: for (k = 0; k < my_patterns.length; k++) {
            const pat = my_patterns[k];
            const m = {}; // match
            for (i = 0; i < pat.pattern.length; i++) {
                v = pat.pattern[i];
                if (v.charAt(0) != '%') {
                    if (value_parts[i] !== v) {
                        continue upper_loop;
                    }
                } else {
                    m[v] = value_parts[i];
                }
            }

            let result = pat.replace;
            for (const k_m in m) {
                result = result.replace(new RegExp(k_m, 'g'), m[k_m]);
            }

            return value_prefix + result.replace('--', '').replace('-0', '0') + value_suffix;
        }

        return false;
    }

    // Process RTL rules for contents
    function processRTL(config, contents) {
        const rules = contents.split(';');
        const response_arr = [];

        const dynamic = config.dynamic;
        const property_rules = config.properties;
        const key_prefixes = config.options.prefix;
        const value_suffixes = config.options.suffix;

        const last_part = rules.pop();
        let rule;
        let value;
        let k;
        let v;
        let i;

        let replaced_expressions = {};
        let idx = 0;
        const replaceFunc = function(str) {
            const transform = `_replaced_value_${idx++}_`;
            replaced_expressions[transform] = str;

            return transform;
        };

        for (i in rules) {
            const part = rules[i];
            const last_brace = part.lastIndexOf('{');
            if (last_brace < 0) {
                rule = part;
            } else {
                response_arr.push(part.substr(0, last_brace + 1));
                rule = part.substr(last_brace + 1);
            }

            // parse "rule: value", ignore other parts
            const rule_parts = rule.split(':', 2);
            let key = rule_parts[0];
            for (k in key_prefixes) {
                key = key.replace(k, key_prefixes[k]);
            }

            if (key.indexOf('/*') >= 0) {
                key = key.replace(/\n/g, '').replace(/\/\*.*?\*\//g, '', key);
            }

            key = trim(key);

            if (rule_parts.length < 2 || (!dynamic[key] && !property_rules[key])) {
                response_arr.push(rule);
                response_arr.push(';');
                continue;
            }

            const key_raw = rule_parts[0];
            const value_raw = rule_parts[1];

            if (property_rules[key]) {
                response_arr.push(key_raw.replace(key, property_rules[key]));
                response_arr.push(':');
                response_arr.push(value_raw);
                response_arr.push(';');
                continue;
            }

            const patterns = dynamic[key];

            if (value_raw.indexOf(',') < 0 && value_raw.indexOf('(') < 0) {
                // simple rule
                value = processSimpleRTLRule(value_raw, patterns, value_suffixes);
                if (!value) {
                    response_arr.push(rule);
                    response_arr.push(';');
                    continue;
                }
            } else {
                // complex rule with "(...)" and ","
                replaced_expressions = {};
                idx = 0;

                value = value_raw.replace(/\([^)]+\)/g, replaceFunc);

                const value_components = value.split(',');
                for (k = 0; k < value_components.length; k++) {
                    v = processSimpleRTLRule(value_components[k], patterns, value_suffixes);
                    if (v) {
                        value_components[k] = v;
                    }
                }

                value = value_components.join(',');
                for (k in replaced_expressions) {
                    value = value.replace(k, replaced_expressions[k]);
                }
            }

            response_arr.push(key_raw);
            response_arr.push(':');
            response_arr.push(value);
            response_arr.push(';');
        }

        response_arr.push(last_part);

        return response_arr.join('');
    }

    exports.processConfig = processRTLConfig;
    exports.processCss = processCss;
})();
