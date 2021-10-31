import React, { FormEvent, useEffect, useRef, useState } from 'react'
import catGift from '../resources/qozlkjkr.gif'

interface Props {
  scale: number,
  srcURL: string,
  width: number,
  height: number,
  gray?: boolean,
  palette?: number[][],
  getPixURL: any,
}

const CanvasI = (props: Props) => {
  const { scale, srcURL, width, height, getPixURL, gray, palette } = props
  const canvasRef = useRef<HTMLCanvasElement>(null)
  let scaleL = scale && scale > 0 && scale <= 50 ? scale * 0.01 : 8 * 0.01

  const colorSim = (rgbColor: number[], compareColor: number[]) => {
    let i
    let max
    let d = 0
    for (i = 0, max = rgbColor.length; i < max; i++) {
      d += (rgbColor[i] - compareColor[i]) * (rgbColor[i] - compareColor[i])
    }
    return Math.sqrt(d)
  }

  const similarColor = (actualColor: number[]) => {
    let selectedColor
    if (!palette) {
      return selectedColor
    }
    let currentSim = colorSim(actualColor, palette[0])
    let nextColor
    palette.forEach((color) => {
      nextColor = colorSim(actualColor, color)
      if (nextColor <= currentSim) {
        selectedColor = color
        currentSim = nextColor
      }
    })
    return selectedColor
  }

  useEffect(() => {
    const startDraw = (image: HTMLImageElement) => {
      let scaledW = width * scaleL
      let scaledH = height * scaleL
      const canvas = canvasRef.current
      if (canvas) {
        const context = canvas.getContext('2d')
        if (context) {
          const tempCanvas = document.createElement('canvas')
          tempCanvas.width = width
          tempCanvas.height = height

          if (width > 800) {
            scaleL *= 0.25
            scaledW = width * scaleL
            scaledH = height * scaleL
            tempCanvas.width = Math.max(scaledW, scaledH) + 50
            tempCanvas.height = Math.max(scaledW, scaledH) + 50
          }

          const tempContext = tempCanvas.getContext('2d')
          if (tempContext) {
            tempContext.drawImage(image, 0, 0, scaledW, scaledH)
            context.imageSmoothingEnabled = false
            context.drawImage
            (tempCanvas,
              0,
              0,
              scaledW,
              scaledH,
              0,
              0,
              width,
              height)

            // 灰度化
            if (gray) {
              let imgPixels = context.getImageData(0, 0, width, height)
              for (let y = 0; y < imgPixels.height; y++) {
                for (let x = 0; x < imgPixels.width; x++) {
                  let i = y * 4 * imgPixels.width + x * 4
                  let avg = (imgPixels.data[i] + imgPixels.data[i + 1] + imgPixels.data[i + 2]) / 3
                  imgPixels.data[i] = avg
                  imgPixels.data[i + 1] = avg
                  imgPixels.data[i + 2] = avg
                }
              }
              context.putImageData(imgPixels, 0, 0, 0, 0, imgPixels.width, imgPixels.height)
            }

            // 调色盘
            if (palette !== undefined) {
              let imgPixels = context.getImageData(0, 0, width, height)
              for (let y = 0; y < imgPixels.height; y++) {
                for (let x = 0; x < imgPixels.width; x++) {
                  let i = y * 4 * imgPixels.width + x * 4
                  const finalColor = similarColor([
                    imgPixels.data[i],
                    imgPixels.data[i + 1],
                    imgPixels.data[i + 2],
                  ])
                  if (finalColor) {
                    imgPixels.data[i] = finalColor[0]
                    imgPixels.data[i + 1] = finalColor[1]
                    imgPixels.data[i + 2] = finalColor[2]
                  }
                }
              }
              context.putImageData(imgPixels, 0, 0, 0, 0, imgPixels.width, imgPixels.height)
            }

            let url = canvas.toDataURL('image/png')
            getPixURL(url)
            tempCanvas.remove()
          }
        }
      }
    }

    if (canvasRef.current) {
      const image = new Image()
      image.setAttribute('crossOrigin', 'anonymous')
      image.src = srcURL
      if (image.complete) {
        startDraw(image)
      } else {
        image.onload = () => {
          startDraw(image)
        }
      }
    }
  }, [scale, srcURL, width, height, getPixURL, gray, palette])

  return (
    <>
      <canvas ref={canvasRef} height={height} width={width} />
    </>
  )
}

const Pix = () => {
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

  useEffect(() => {
    /*const maxWidth = document.documentElement.clientWidth
    setWidth(maxWidth - 100)
    setMaxWidth(maxWidth - 100)
    const maxHeight = document.documentElement.clientHeight
    setHeight(maxHeight - 100)
    setMaxHeight(maxHeight - 100)*/
  })

  const handlePickImage = (event: FormEvent<HTMLInputElement>) => {
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
    <div style={{
      textAlign: 'center',
      backgroundColor: 'grey',
      fontFamily: 'zpix',
      fontSize: 27
    }}>
      <div>
        {srcURL === '' ?
          <div style={{
            width: 200,
            height: 200,
            backgroundColor: 'darkcyan',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto'
          }}>
            请上传照片
          </div>
          :
          <CanvasI
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
      <div>
        <input
          type='file'
          accept='image/*'
          onInput={handlePickImage}
        />
      </div>
      <div>
        <input
          type='range'
          min={0}
          max={50}
          value={scale * 2}
          onInput={(event) => {
            setScale(Math.ceil(Number(event.currentTarget.value)))
          }}
        />
      </div>
      <div>
        <input
          type='range'
          min={50}
          max={maxWidth}
          value={width}
          onInput={(event) => {
            setWidth(Math.ceil(Number(event.currentTarget.value)))
          }}
        />
      </div>
      <div>
        <input
          type='range'
          min={50}
          max={maxHeight}
          value={height}
          onInput={(event) => {
            setHeight(Math.ceil(Number(event.currentTarget.value)))
          }}
        />
      </div>
      <div>
        <label>
          <input type='checkbox' checked={gray} onChange={(e) => {
            setGray(!gray)
          }} />
          gray
        </label>
      </div>
      <div>
        <label>
          <input type='checkbox' checked={isPalette} onChange={(e) => {
            setIsPalette(!isPalette)
          }} />
          palette
        </label>
      </div>
      <div>
        <button
          style={{
            fontFamily: 'zpix',
            fontSize: 20
          }}

          onClick={() => {
            if (paletteIndex == paletteList.length - 1) {
              setPalette(paletteList[0])
              setPaletteIndex(0)
            } else {
              setPalette(paletteList[paletteIndex + 1])
              setPaletteIndex(paletteIndex + 1)
            }

          }}>
          换调色板
        </button>
      </div>
      <div>
        <button
          style={{
            fontFamily: 'zpix',
            fontSize: 20
          }}

          onClick={() => {
            const a = document.createElement('a')
            a.href = pixURL
            a.download = 'pixel.png'
            a.click()
          }}>
          保存
        </button>
      </div>
      <div>
        <img src={catGift} alt='ani cat' />
      </div>
    </div>
  )
}

export default Pix
