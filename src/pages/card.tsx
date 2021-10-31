import React, { ChangeEvent, useRef, useState } from 'react'
import CssBaseline from '@mui/material/CssBaseline'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import IconButton from '@mui/material/IconButton'
import Card from '@mui/material/Card'
import CardMedia from '@mui/material/CardMedia'
import ImagePlus from 'pixelarticons/svg/image-plus.svg'
import Upload from 'pixelarticons/svg/upload.svg'
import { Button, Divider, Grid, Typography } from '@mui/material'
import catGift from '../resources/wxpchoua.gif'
import Slider from '@mui/material/Slider'
import { VolumeDown } from '@mui/icons-material'
import Stack from '@mui/material/Stack'

const WideCardMedia = () => {
  const fileRef = useRef<HTMLInputElement>(null)

  const [srcURL, setSrcURL] = useState('')

  // 上传图片按钮点击
  const handleBtnUploadClick = () => {
    if (!fileRef.current) {
      return
    }
    fileRef.current.click()
  }

  const handleFileInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.currentTarget.files
    if (!files) {
      alert('文件为空')
      return
    }
    const fileObj = files[0]
    if (['jpeg', 'png', 'jpg'].indexOf(fileObj.type.split('/')[1]) < 0) {
      alert('只能上传图片格式的文件')
      return
    }
    const imageMaxSize = 1024 * 1024 * 5
    if (fileObj.size > imageMaxSize) {
      alert('图片最大为5MB')
      return
    }
    const localImageUrl = window.URL.createObjectURL(fileObj)
    setSrcURL(localImageUrl)
  }

  return (
    <React.Fragment>
      <CssBaseline />
      <Container fixed sx={{
        fontFamily: 'zpix'
      }}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            p: 1,
            m: 1,
            bgcolor: '#cfe8fc',
            height: '60vh',
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          <div
            style={{
              maxHeight: '60vh',
              maxWidth: '100%',
              overflow: 'hidden'
            }}
          >
            {srcURL === '' ?
              <img
                width={150}
                height={150}
                src={ImagePlus}
                alt='upload image'
              />
              :
              <img
                src={srcURL}
                alt='uploaded image'
              />
            }
          </div>
          <input
            id='file'
            ref={fileRef}
            type='file'
            hidden
            onChange={handleFileInputChange}
          />
          <label htmlFor='file'>
            <Button
              variant='outlined'
              endIcon={
                <img
                  width={30}
                  height={30}
                  src={Upload}
                  alt='upload image'
                />
              }
              sx={{
                fontFamily: 'zpix',
                mt: '1vh'
              }}
              onClick={handleBtnUploadClick}
            >
              UPLOAD
            </Button>
          </label>
        </Box>
        <Grid
          container
          sx={{
            backgroundColor: 'black',
            color: 'white',
            height: '27vh'
          }}
        >
          <Grid item xs={7}>
            <Stack spacing={2} direction='row' sx={{ mb: 1 }} alignItems='center'>
              <VolumeDown />
              <Slider aria-label='Volume' sx={{
                color: 'white'
              }} />
            </Stack>
            <Stack spacing={2} direction='row' sx={{ mb: 1 }} alignItems='center'>
              <VolumeDown />
              <Slider aria-label='Volume' sx={{
                color: 'white'
              }} />
            </Stack>
            <Stack spacing={2} direction='row' sx={{ mb: 1 }} alignItems='center'>
              <VolumeDown />
              <Slider aria-label='Volume' sx={{
                color: 'white'
              }} />
            </Stack>
          </Grid>
          <Grid item xs={5}>
            <img src={catGift} alt='ani cat' />
          </Grid>
        </Grid>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            p: 1,
            m: 1,
            bgcolor: '#c0d6e7',
            height: '3vh',
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
