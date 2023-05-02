import { useQuery } from '@tanstack/react-query';
import { UseQueryOptions } from '@tanstack/react-query/src/types';

import { request } from './index';

type MSO = {
  id: string;
  name: string;
};

export type Lineup = {
  device: string;
  lineupId: string;
  location: string;
  mso: MSO;
  id: string;
  type: string;
};

export type GetLineupsQueryResponseType = Lineup[];

type LineupsParams = {
  startDateTime: string;
  postalCode: string;
  country: string;
};

const getLineups = (
  params: LineupsParams,
): UseQueryOptions<GetLineupsQueryResponseType> => ({
  queryKey: ['lineups', params],
  queryFn: async ({ signal }) => {
    const { data } = await request<GetLineupsQueryResponseType>({
      url: 'lineups',
      params,
      signal,
    });
    // Fix Gracenote API bug where it returns an empty array instead of an empty object
    return data.length ? data : [];
  },
});

export const useGetLineupsQuery = (params: LineupsParams) =>
  useQuery(getLineups(params));
