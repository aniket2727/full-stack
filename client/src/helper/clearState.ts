


export const setEmpty = (...setters: Array<React.Dispatch<React.SetStateAction<any>>>) => {
    setters.forEach(setter => {
      setter((prevValue: any) => {
        if (typeof prevValue === 'string') return '';
        if (typeof prevValue === 'boolean') return false;
        if (typeof prevValue === 'number') return 0;
        return null; // For any other types, set to null
      });
    });
  };
  