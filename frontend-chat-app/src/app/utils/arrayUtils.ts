export const addValueToANewArray = (array: unknown[], value: unknown) => {
    const messageListClone: unknown[] = array.concat();
    messageListClone.push(value);

    return messageListClone;
}