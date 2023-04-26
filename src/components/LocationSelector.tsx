import { FormControlLabel, Radio } from '@mui/material';
import { Box } from './Box';
import { Label } from './Label';
import { FC } from 'react';

export const Locations = {
  // East Meadow,
  'New York': 11554,

  // Oxnard,
  'Los Angeles': 90210,
};

export const zipCodeLocationsMap = Object.fromEntries(
  Object.entries(Locations).map((location) => location.reverse()),
);

type RenderButtonParams = {
  state: string;
  zipCode: number;
  currentZipCode: number;
  setZipCode: (zipCode: number) => void;
};

const renderRadioButton = ({
  state,
  zipCode,
  setZipCode,
  currentZipCode,
}: RenderButtonParams) => {
  const checked = currentZipCode === zipCode;
  return (
    <Box flexDirection={'row'} key={state} alignItems={'center'}>
      <FormControlLabel
        value={zipCode}
        control={
          <Radio
            onClick={() => {
              setZipCode(zipCode);
            }}
            checked={checked}
          />
        }
        label={state}
      />
    </Box>
  );
};

type Props = {
  currentZipCode: number;
  setZipCode: (zipCode: number) => void;
};

export const LocationSelector: FC<Props> = ({ currentZipCode, setZipCode }) => {
  return (
    <Box flexDirection={'row'}>
      <Label variant="h4" sx={{ mr: '1.5rem' }}>
        <span>Choose location</span>
      </Label>
      {Object.entries(Locations).map(([state, zipCode]) =>
        renderRadioButton({ state, zipCode, setZipCode, currentZipCode }),
      )}
    </Box>
  );
};
