import React from 'react'
import CssBaseline from '@mui/material/CssBaseline'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Card from '@mui/material/Card'
import CardMedia from '@mui/material/CardMedia'
import ImagePlus from 'pixelarticons/svg/image-plus.svg'

const WideCardMedia = () => {
  return (
    <React.Fragment>
      <CssBaseline />
      <Container fixed sx={{
        fontFamily: 'zpix'
      }}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            p: 1,
            m: 1,
            bgcolor: '#cfe8fc',
            height: '70vh',
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          <img
            width={100}
            height={100}
            src={ImagePlus}
            alt='upload image'
          />
        </Box>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            p: 1,
            m: 1,
            bgcolor: '#62a4d9',
            height: '18vh',
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
        </Box>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            p: 1,
            m: 1,
            bgcolor: '#c0d6e7',
            height: '5vh',
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          Design By AKAZWZ
        </Box>
      </Container>
    </React.Fragment>

  )
}

export default WideCardMedia
