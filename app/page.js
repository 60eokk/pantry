'use client';
import { Box, Stack, Typography, Button, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { firestore } from "@/firebase";
import { collection, query, getDocs, addDoc, deleteDoc, doc, updateDoc } from "firebase/firestore";

// Main component
export default function Home() {
  const [pantry, setPantry] = useState([]);
  const [newItem, setNewItem] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  // Fetch pantry items from Firestore
  useEffect(() => {
    const fetchPantryItems = async () => {
      const snapshot = query(collection(firestore, 'pantry'));
      const docs = await getDocs(snapshot);
      const pantryList = docs.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setPantry(pantryList);
    };

    fetchPantryItems();
  }, []);

  // Add a new pantry item
  const handleAddItem = async () => {
    if (newItem.trim()) {
      await addDoc(collection(firestore, 'pantry'), { name: newItem });
      setNewItem('');
      // Refresh pantry list
      const snapshot = query(collection(firestore, 'pantry'));
      const docs = await getDocs(snapshot);
      const pantryList = docs.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setPantry(pantryList);
    }
  };

  // Delete a pantry item
  const handleDeleteItem = async (id) => {
    await deleteDoc(doc(firestore, 'pantry', id));
    setPantry(pantry.filter(item => item.id !== id));
  };

  // Update a pantry item
  const handleUpdateItem = async (id, newName) => {
    await updateDoc(doc(firestore, 'pantry', id), { name: newName });
    // Refresh pantry list
    const snapshot = query(collection(firestore, 'pantry'));
    const docs = await getDocs(snapshot);
    const pantryList = docs.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    setPantry(pantryList);
  };

  // Filter pantry items based on the search term
  const filteredPantry = pantry.filter(item => item.name && item.name.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <Box
      width="100vw"
      height="100vh"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      padding={4}
    >
      <Typography variant="h3" gutterBottom>
        Pantry Tracker
      </Typography>

      <Stack spacing={2} direction="row" mb={4}>
        <TextField
          label="New Item"
          variant="outlined"
          value={newItem}
          onChange={(e) => setNewItem(e.target.value)}
        />
        <Button variant="contained" color="primary" onClick={handleAddItem}>
          Add Item
        </Button>
      </Stack>

      <TextField
        label="Search Items"
        variant="outlined"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        fullWidth
        mb={4}
      />

      <Stack width="80%" spacing={2} overflow="auto">
        {filteredPantry.map((item) => (
          <Box
            key={item.id}
            width="100%"
            padding={2}
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            bgcolor="#f0f0f0"
            borderRadius={2}
          >
            <Typography
              variant="h6"
              color="#333"
              textAlign="center"
              fontWeight="bold"
            >
              {item.name.charAt(0).toUpperCase() + item.name.slice(1)}
            </Typography>

            <Stack direction="row" spacing={1}>
              <Button
                variant="contained"
                color="secondary"
                onClick={() => handleUpdateItem(item.id, prompt('New name:', item.name))}
              >
                Update
              </Button>
              <Button
                variant="contained"
                color="error"
                onClick={() => handleDeleteItem(item.id)}
              >
                Delete
              </Button>
            </Stack>
          </Box>
        ))}
      </Stack>
    </Box>
  );
}