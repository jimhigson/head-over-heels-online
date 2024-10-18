export const convertRoomId = (xmlRoomName: string): string => {
    return xmlRoomName.replace('byblos', 'bookworld').replace('moon', 'moonbase');
};
