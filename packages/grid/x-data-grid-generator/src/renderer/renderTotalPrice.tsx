import * as React from 'react';
import clsx from 'clsx';
import { alpha, styled } from '@mui/material/styles';
import { GridRenderCellParams } from '@mui/x-data-grid-premium';

const Value = styled('div')(({ theme }) => ({
  width: '100%',
  height: '100%',
  lineHeight: '100%',
  paddingRight: 8,
  fontVariantNumeric: 'tabular-nums',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  '&.good': {
    backgroundColor: alpha(theme.palette.success.main, 0.3),
  },
  '&.bad': {
    backgroundColor: alpha(theme.palette.error.main, 0.3),
  },
}));

interface TotalPriceProps {
  value: number;
}

const currencyFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
});

const TotalPrice = React.memo(function TotalPrice(props: TotalPriceProps) {
  const { value } = props;
  return (
    <Value
      className={clsx({
        good: value > 1000000,
        bad: value < 1000000,
      })}
    >
      {currencyFormatter.format(value)}
    </Value>
  );
});

export function renderTotalPrice(params: GridRenderCellParams<number>) {
  if (params.rowNode.isAutoGenerated || params.value == null) {
    return '';
  }
  return <TotalPrice value={params.value} />;
}
