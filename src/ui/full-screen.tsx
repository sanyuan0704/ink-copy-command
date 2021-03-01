import React from 'react';
import { Box } from 'ink';

export const FullScreen: React.FC = ({ children }) => {
  const [size, setSize] = React.useState({
    columns: process.stdout.columns,
    rows: process.stdout.rows,
  });

  React.useEffect(() => {
    function onResize(): void {
      setSize({
        columns: process.stdout.columns,
        rows: process.stdout.rows,
      });
    }

    process.stdout.on('resize', onResize);

    return (): void => {
      process.stdout.removeListener('resize', onResize);
    };
  }, []);

  return (
    <Box width={size.columns} height={size.rows} flexDirection="column">
      {children}
    </Box>
  );
};
