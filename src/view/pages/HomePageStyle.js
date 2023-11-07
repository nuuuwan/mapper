const BLOCK_SIZE = 60;

export const STYLE = {
  ALL: { margin: 0, padding: 0 },
  HEADER: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
  },
  BODY: {
    position: "fixed",
    top: BLOCK_SIZE,
    bottom: BLOCK_SIZE,
    left: 0,
    right: 0,
    margin: "auto",
    align: "center",
  },

  FOOTER: {
    position: "fixed",
    bottom: 0,
    left: 0,
    right: 0,
  },

  BODY_CONTROLS: {
    position: "fixed",
    bottom: BLOCK_SIZE,
    right: 0,

    margin: "auto",
  },

  BODY_CONTENT: {
    position: "fixed",
    top: BLOCK_SIZE,
    bottom: BLOCK_SIZE,
    right: 0,
    left: 0,

    margin: "auto",
  },
};
