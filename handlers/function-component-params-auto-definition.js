function setParamsTypeDefinitionFromFunctionType(documentation, path) {
    // Cannot read property 'params' of null
    // Cannot read property 'typeAnnotation' of undefined
    if (
        path.node.type === 'ArrowFunctionExpression' &&
        !path.parentPath.node.init.params[0].typeAnnotation
    ) {
        const paramTypeName =
            path.parentPath.node.id.typeAnnotation.typeAnnotation.typeParameters.params[0].typeName
                .name;

        let typePath = path.parentPath.parentPath.parentPath.parentPath.value.find(propertyPath => {
            if (
                propertyPath.type === 'ExportNamedDeclaration' &&
                propertyPath.declaration &&
                propertyPath.declaration.id &&
                propertyPath.declaration.id.name === paramTypeName
            ) {
                return true;
            }

            return (
                propertyPath.type === 'TSTypeAliasDeclaration' &&
                propertyPath.id.name === paramTypeName
            );
        });

        typePath = typePath.type === 'ExportNamedDeclaration' ? typePath.declaration : typePath;

        if (typePath) {
            const typedParam = Object.assign({}, path.parentPath.node.init.params[0], {
                typeAnnotation: typePath,
            });

            path.parentPath.node.init.params = [typedParam];
        }
    }
}

module.exports = setParamsTypeDefinitionFromFunctionType;
