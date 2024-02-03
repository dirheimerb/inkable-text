type ClassValue = string | boolean | null | undefined | Record<string, boolean>;

/**
 * Joins class names based on provided conditions.
 * - Strings are added as class names.
 * - Objects are processed where the key is the class name and the value is a condition.
 *   The class name is added if the condition is true.
 * - `null`, `undefined`, and `false` values are ignored.
 *
 * @param {...ClassValue[]} args - Class names or conditions to be joined.
 * @returns {string} - A string of class names separated by spaces.
 */
export default function joinClasses(...args: ClassValue[]): string {
    const classes: string[] = [];

    args.forEach((arg) => {
        if (typeof arg === 'string') {
            classes.push(arg);
        } else if (arg instanceof Object) {
            Object.entries(arg).forEach(([key, value]) => {
                if (value) {
                    classes.push(key);
                }
            });
        }
    });

    return classes.join(' ');
}
