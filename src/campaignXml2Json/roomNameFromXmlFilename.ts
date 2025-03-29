// eslint-disable-next-line @typescript-eslint/no-unused-vars
const specialRoomNames = {
  penitentiary19: "penitentiaryThePit",
  moonbase20: "moonbaseArrow1",
  moonbase23: "moonbaseArrow2",
  blacktooth86: "blacktoothGuardian",
};

export const roomNameFromXmlFilename = (xmlFileName: string) => {
  const match = /(.*)\.xml/.exec(xmlFileName);

  if (match === null) {
    throw new Error(`unparsable file name: ${xmlFileName}`);
  }

  return match![1];
};
