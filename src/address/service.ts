interface GetAddresses {
  data: [];
  status: number;
  statusText: string;
}

export const GetAddresses = async (): Promise<GetAddresses | void> => {};
