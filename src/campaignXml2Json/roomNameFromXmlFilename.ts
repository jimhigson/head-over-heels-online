// eslint-disable-next-line @typescript-eslint/no-unused-vars
const specialRoomNames = {
  penitentiary19: "penitentiary19thePit",
  moonbase20: "moonbase20arrow",
  moonbase23: "moonbase23arrow",
  blacktooth86: "blacktooth86guardian",
  blacktooth35: "blacktooth35double",
  blacktooth40fish: "blacktooth40doubleFish",
  blacktooth62fish: "blacktooth62doubleFish",
};

export const roomNameFromXmlFilename = (xmlFileName: string) => {
  const match = /(.*)\.xml/.exec(xmlFileName);

  if (match === null) {
    throw new Error(`unparsable file name: ${xmlFileName}`);
  }

  return match![1];
};
