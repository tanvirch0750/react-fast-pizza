import { ILocationInfo, IMapPosition } from '../types/globalTypes';

export async function getAddress({
  latitude,
  longitude,
}: IMapPosition): Promise<ILocationInfo> {
  const res = await fetch(
    `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}`
  );
  if (!res.ok) throw Error('Failed getting address');

  const data: ILocationInfo = (await res.json()) as ILocationInfo;
  return data;
}
