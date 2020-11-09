// jest-dom adds custom jest matchers for asserting on DOM nodes.
import '@testing-library/jest-dom/extend-expect';
import { toHaveNoViolations } from 'jest-axe';

expect.extend(toHaveNoViolations);
