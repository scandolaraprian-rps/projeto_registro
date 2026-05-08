const MOCK_STORAGE_KEY = 'authledger_events';

export const mockDatabase = {
  list: (): any[] => {
    const data = localStorage.getItem(MOCK_STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  },

  insert: (item: any): void => {
    const current = mockDatabase.list();
    const updated = [item, ...current];
    localStorage.setItem(MOCK_STORAGE_KEY, JSON.stringify(updated));
  },

  getById: (id: string): any | null => {
    const list = mockDatabase.list();
    return list.find(item => item.id === id) || null;
  }
};
