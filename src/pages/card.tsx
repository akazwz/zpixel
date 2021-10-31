import React, { ChangeEvent, useRef, useState } from 'react'
import CssBaseline from '@mui/material/CssBaseline'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import IconButton from '@mui/material/IconButton'
import Card from '@mui/material/Card'
import CardMedia from '@mui/material/CardMedia'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormControl from '@mui/material/FormControl'
import FormLabel from '@mui/material/FormLabel'
import ImagePlus from 'pixelarticons/svg/image-plus.svg'
import Upload from 'pixelarticons/svg/upload.svg'
import PixelArtIcons from 'pixelarticons/svg/pixelarticons.svg'
import Save from 'pixelarticons/svg/save.svg'
import Fill from 'pixelarticons/svg/fill.svg'
import FillHalf from 'pixelarticons/svg/fill-half.svg'
import Next from 'pixelarticons/svg/next.svg'
import { Button, Checkbox, Divider, Grid, SvgIcon, Typography } from '@mui/material'
import catGift from '../resources/wxpchoua.gif'
import Slider from '@mui/material/Slider'
import { VolumeDown } from '@mui/icons-material'
import Stack from '@mui/material/Stack'
import PixCanvas from '../components/PixCanvas'

const WideCardMedia = () => {
  const fileRef = useRef<HTMLInputElement>(null)

  const [scale, setScale] = useState(10)
  const [width, setWidth] = useState(300)
  const [height, setHeight] = useState(300)
  const [maxWidth, setMaxWidth] = useState(400)
  const [maxHeight, setMaxHeight] = useState(400)
  const [srcURL, setSrcURL] = useState('')
  const [pixURL, setPixURL] = useState('')

  const paletteList = [[[13, 43, 69], [32, 60, 86], [84, 78, 104], [141, 105, 122], [208, 129, 89], [255, 170, 94], [255, 212, 163], [255, 236, 214]], [[48, 0, 48], [96, 40, 120], [248, 144, 32], [248, 240, 136]], [[26, 28, 44], [93, 39, 93], [177, 62, 83], [239, 125, 87], [255, 205, 117], [167, 240, 112], [56, 183, 100], [37, 113, 121], [41, 54, 111], [59, 93, 201], [65, 166, 246], [115, 239, 247], [244, 244, 244], [148, 176, 194], [86, 108, 134], [51, 60, 87]], [[44, 33, 55], [118, 68, 98], [237, 180, 161], [169, 104, 104]], [[7, 5, 5], [33, 25, 25], [82, 58, 42], [138, 107, 62], [193, 156, 77], [234, 219, 116], [160, 179, 53], [83, 124, 68], [66, 60, 86], [89, 111, 175], [107, 185, 182], [251, 250, 249], [184, 170, 176], [121, 112, 126], [148, 91, 40]], [[140, 143, 174], [88, 69, 99], [62, 33, 55], [154, 99, 72], [215, 155, 125], [245, 237, 186], [192, 199, 65], [100, 125, 52], [228, 148, 58], [157, 48, 59], [210, 100, 113], [112, 55, 127], [126, 196, 193], [52, 133, 157], [23, 67, 75], [31, 14, 28]], [[94, 96, 110], [34, 52, 209], [12, 126, 69], [68, 170, 204], [138, 54, 34], [235, 138, 96], [0, 0, 0], [92, 46, 120], [226, 61, 105], [170, 92, 61], [255, 217, 63], [181, 181, 181], [255, 255, 255]], [[21, 25, 26], [138, 76, 88], [217, 98, 117], [230, 184, 193], [69, 107, 115], [75, 151, 166], [165, 189, 194], [255, 245, 247]]]

  const [paletteIndex, setPaletteIndex] = useState(0)
  const [palette, setPalette] = useState(paletteList[0])
  const [isPalette, setIsPalette] = useState(false)
  const [gray, setGray] = useState(false)

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
    const tempImg = new Image()
    tempImg.src = localImageUrl
    tempImg.onload = () => {
      const widthT = tempImg.width
      const heightT = tempImg.height
      // 图片过大 保持原有比例缩小
      if (widthT > maxWidth || heightT > maxHeight) {
        if (widthT > heightT) {
          setWidth(maxWidth)
          setHeight(maxWidth * (heightT / widthT))
        } else {
          setHeight(maxHeight)
          setWidth(maxHeight * (widthT / heightT))
        }
      } else {
        setWidth(tempImg.width)
        setHeight(tempImg.height)
      }
    }
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
              <PixCanvas
                scale={scale}
                width={width}
                height={height}
                srcURL={srcURL}
                getPixURL={(url: string) => {
                  setPixURL(url)
                }
                }
                gray={gray}
                palette={isPalette ? palette : undefined}
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
            height: '25vh',
            mt: 1,

          }}
        >
          <Grid item xs={7}>
            <Stack spacing={2} direction='row' alignItems='center' sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center'
            }}>
              <img
                src={PixelArtIcons}
                width={20}
                height={20}
                alt='ani cat'
              />
              <p>Pix</p>
              <Slider
                aria-label='Volume'
                sx={{ maxWidth: 200 }}
                min={0}
                max={50}
                value={scale * 2}
                onChange={(event, value) => {
                  setScale(Math.ceil(Number(value)))
                }}
              />
            </Stack>
            <Stack spacing={2} direction='row' alignItems='center' sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center'
            }}>
              <FormControlLabel
                value='start'
                control={
                  <Checkbox
                    checked={gray}
                    onChange={() => {
                      setGray(!gray)
                    }}
                  />}
                label={
                  <img
                    width={30}
                    height={30}
                    src={Fill}
                    alt='upload image'
                  />
                }
                labelPlacement='start'
              />
              <FormControlLabel
                value='start'
                control={
                  <Checkbox
                    checked={isPalette}
                    onChange={() => {
                      setIsPalette(!isPalette)
                    }}
                  />}
                label={
                  <img
                    width={30}
                    height={30}
                    src={FillHalf}
                    alt='upload image'
                  />
                }
                labelPlacement='start'
              />
            </Stack>
            <Stack spacing={2} direction='row' sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center'
            }}>
              <Button
                variant='outlined'
                endIcon={
                  <SvgIcon>
                    <path d='M6 4h2v2h2v2h2v2h2v4h-2v2h-2v2H8v2H6V4zm12 0h-2v16h2V4z' fill='currentColor' />
                  </SvgIcon>
                }
                sx={{
                  fontFamily: 'zpix',
                }}
                onClick={() => {
                  if (paletteIndex == paletteList.length - 1) {
                    setPalette(paletteList[0])
                    setPaletteIndex(0)
                  } else {
                    setPalette(paletteList[paletteIndex + 1])
                    setPaletteIndex(paletteIndex + 1)
                  }
                }}
              >
                CHANGE
              </Button>
              <Button
                variant='outlined'
                endIcon={
                  <SvgIcon>
                    <path d='M4 2h14v2H4v16h2v-6h12v6h2V6h2v16H2V2h2zm4 18h8v-4H8v4zM20 6h-2V4h2v2zM6 6h9v4H6V6z'
                          fill='currentColor' />
                  </SvgIcon>
                }
                sx={{
                  fontFamily: 'zpix',
                }}
                onClick={() => {
                  const a = document.createElement('a')
                  a.href = pixURL
                  a.download = 'pixel.png'
                  a.click()
                }}
              >
                SAVE
              </Button>
            </Stack>
          </Grid>
          <Grid item xs={5} sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          }}>
            <img
              src={catGift}
              alt='ani cat'
              height='100vh'
              width='100vw'
            />
          </Grid>
        </Grid>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            bgcolor: '#c0d6e7',
            mt: 1,
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
