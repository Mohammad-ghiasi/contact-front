"use client"
import api from '@/services/api'
import { Button } from '@chakra-ui/react'
import React from 'react'

export default function Ammm() {
    const getdata = () => {
        api.get('get-contacts')
        .then((res) => {
            console.log(res);
            
        })
        .catch((err) => {
            console.log(err);
            
        })
    }
  return (
    <div>
        <Button onClick={() => getdata()}>Click</Button>
    </div>
  )
}
