const generateCode = async (code_length: number) => {
  let str = "";
  for (let i = 0; i < code_length; i++) {
    str += Math.random().toString(10).substr(2, 10);
  }
  return str.substr(0, code_length);
};

export { generateCode };
