// export default function invariant(
//   cond?: boolean,
//   message?: string,
//   ...args: string[]
// ): asserts cond {
//   if (cond) {
//     return;
//   }

//   throw new Error(
//     'Internal Lexical error: invariant() is meant to be replaced at compile ' +
//       'time. There is no runtime version. Error: ' +
//       message,
//   );
// }

export default function invariant(
    condition?: boolean,
    message = 'An invariant condition was falsified', // Provide a default message
    ...args: string[]
): asserts condition {
    if (condition) {
        return;
    }

    const errorArgs = args.length > 0 ? ` Arguments: ${args.join(', ')}` : '';
    const errorMessage = `Internal Lexical error: invariant() failed. ${message}${errorArgs}`;

    // Throw an error with a descriptive message
    throw new Error(errorMessage);
}
