// eslint-disable-next-line @typescript-eslint/no-unused-vars
const specialRoomNames = {
  penitentiary19: "penitentiaryThePit",
};

export const roomNameFromXmlFilename = (xmlFileName: string) => {
  const match = /(.*)\.xml/.exec(xmlFileName);

  if (match === null) {
    throw new Error(`unparsable file name: ${xmlFileName}`);
  }

  return match![1];
};
