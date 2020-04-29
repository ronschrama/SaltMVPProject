const uploadFile = async (ctx) => {
  ctx.body = {
    code: 1,
    data: ctx.file,
  };
};

module.exports = {
  uploadFile,
};