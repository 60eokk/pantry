'use client'
import { Box, Stack, Typography } from "@mui/material";
import { firestore } from "@/firebase";
import { useEffect, useState } from "react";
import { collection, query, getDocs } from "firebase/firestore";

// const item = [
//   'tomato',
//   'tomate',
//   'tometo',
// ]

export default function Home() {
  const [pantry, setPantry] = useState([])
  useEffect(() => {
    const updatePantry = async () => {
      const snapshot = query(collection(firestore, 'pantry'));
      const docs = await getDocs(snapshot);
      const pantryList = []
      docs.forEach((doc) => {
        // console.log(doc.id, doc.data());
        pantryList.push(doc.id)
      });
      console.log(pantryList)
      setPantry(pantryList)
    };

    updatePantry();
  }, []);

  return (
    <Box
      width = '100vw'
      height = '100vh'
      display = {'flex'}
      justifyContent={'center'}
      alignItems={'center'}
      >


    <Stack width = '800px'
    height = '300px'
    spacing = {2} 
    overflow = {'auto'}>
    {pantry.map((i) => (
      <Box
        key={i}
        width="100%"
        height="300px"
        display="flex"
        justifyContent="center"
        alignItems="center"
        bgcolor="#f0f0f0"
      >

        <Typography
        variant = {'h4'}
        color = {'#333'}
        textAlign = {'center'}
        fontWeight = {'bold'}
        >
          {
            i.charAt(0).toUpperCase() + i.slice(1)
          }
        </Typography>
        {i}
      </Box> 
    ))}

    </Stack>
      </Box>
  )
}