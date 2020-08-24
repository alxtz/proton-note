const wait = async (delay: number) => {
  return new Promise((resolve, reject) => {
    setTimeout(resolve, delay);
  });
};

export const encrypt = async (data: any) => {
  await wait(1500);
  return data;
};

export const decrypt = async (data: any) => {
  await wait(1500);
  return data;
};
