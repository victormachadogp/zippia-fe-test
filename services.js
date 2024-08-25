export const fetchUsers = async () => {
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/users');
      if (!response.ok) throw new Error('Failed to fetch users');
      return await response.json();
    } catch (err) {
      throw err;
    }
  };
  