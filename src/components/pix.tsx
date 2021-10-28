import React, { FormEvent, useEffect, useRef, useState } from 'react'
import PixelPic from './pixelpic'

interface Props {
  scale: number,
  srcURL: string,
  width: number,
  height: number,
  getPixURL: any,
}

const CanvasI = (props: Props) => {
  const { scale, srcURL, width, height, getPixURL } = props
  const canvasRef = useRef<HTMLCanvasElement>(null)
  let scaleL = scale && scale > 0 && scale <= 50 ? scale * 0.01 : 8 * 0.01

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
  }, [scale, srcURL, width, height])

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
  const [srcURL, setSrcURL] = useState('')
  const [pixURL, setPixURL] = useState('')

  const handlePickImage = (event: FormEvent<HTMLInputElement>) => {
    const files = event.currentTarget.files
    if (!files) {
      alert('文件为空')
      return
    }
    const fileObj = files[0]
    console.log(fileObj.type)
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

      const maxWith = document.documentElement.clientWidth
      const maxHeight = document.documentElement.clientHeight
      // 图片过大 保持原有比例缩小
      if (widthT > maxWith || heightT > maxHeight) {
        if (widthT > heightT) {
          setWidth(maxWith)
          setHeight(maxWith * (heightT / widthT))
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
    <div style={{ textAlign: 'center', backgroundColor: 'grey' }}>
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
            请上传图片
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
          />
        }
      </div>

      {/*<input type='number' value={value} onInput={(event) => {
          setValue(Number(event.currentTarget.value))
          setScale(Number(event.currentTarget.value))
        }} />
        <input type='number' value={width} onInput={(event) => {
          setWidth(Number(event.currentTarget.value))
        }} />
        <input type='number' value={height} onInput={(event) => {
          setHeight(Number(event.currentTarget.value))
        }} />*/}
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
          max={500}
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
          max={500}
          value={height}
          onInput={(event) => {
            setHeight(Math.ceil(Number(event.currentTarget.value)))
          }}
        />
      </div>
      <div>
        <button onClick={() => {
          const a = document.createElement('a')
          a.href = pixURL
          a.download = 'pixel.png'
          a.click()
        }}>
          保存
        </button>
      </div>
    </div>
  )
}

export default Pix
