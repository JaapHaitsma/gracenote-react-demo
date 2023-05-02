import { DatePicker } from '@mui/x-date-pickers';
import { Dispatch, SetStateAction } from 'react';
import { Box } from './Box';
import { Label } from './Label';
import type {} from '@mui/x-date-pickers/themeAugmentation';
import { createTheme, ThemeProvider } from '@mui/material';
import dayjs, { Dayjs } from 'dayjs';

const theme = createTheme({
  components: {
    MuiDateField: {
      styleOverrides: {
        root: {
          backgroundColor: '#fff',
        },
      },
    },
    MuiInputAdornment: {
      styleOverrides: {
        root: {
          color: '#fff',
          '.MuiButtonBase-root': {
            color: '#fff',
          },
        },
      },
    },
  },
});

type Props = {
  selectedDate: Dayjs | null;
  setSelectedDate: Dispatch<SetStateAction<Dayjs | null>>;
};

export const DateSelector = ({ setSelectedDate, selectedDate }: Props) => {
  return (
    <Box flexDirection={'row'} sx={{ alignItems: 'center' }}>
      <Label variant="h4" sx={{ mr: '1.5rem' }}>
        <span>Choose Date</span>
      </Label>
      <ThemeProvider theme={theme}>
        <DatePicker<Dayjs | null>
          closeOnSelect
          value={selectedDate}
          minDate={dayjs()}
          slotProps={{
            textField: {
              InputProps: {
                style: {
                  color: '#fff',
                  borderColor: '#fff',
                  borderStyle: 'solid',
                  borderWidth: '1px',
                },
              },
              size: 'small',
            },
            field: {
              className: 'test',
            },
          }}
          onChange={(value) => {
            setSelectedDate(value);
          }}
        />
      </ThemeProvider>
    </Box>
  );
};
