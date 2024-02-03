import { v4 as uuidv4 } from 'uuid';
/**
 * Generates a unique id
 * @returns a unique id
 */
export const generateId = (): string => {
    return uuidv4();
};
