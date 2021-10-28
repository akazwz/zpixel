import React, { FormEvent, useState } from 'react'
import PixelPic from '../components/pixelpic'

const PixOne = () => {
  const [imageSrc, setImageSrc] = useState('')
  const [pixSrc, setPixSrc] = useState('')
  const [amount, setAmount] = useState(0.7)
  const [width, setWidth] = useState(500)
  const [height, setHeight] = useState(500)

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
      if (widthT > 500 || heightT > 500) {
        if (widthT > heightT) {
          setWidth(600)
          setHeight(600 * (heightT / widthT))
        } else {

        }
      }
      setWidth(tempImg.width)
      setHeight(tempImg.height)
    }
    setImageSrc(localImageUrl)
  }

  return (
    <div style={{textAlign: 'center'}}>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {imageSrc === '' ? <div style={{
          width: 200,
          height: 200,
          backgroundColor: "grey",
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          <div>
            请上传图片
          </div>
        </div> : <PixelPic
          amount={1 - amount}
          width={width}
          height={height}
          imageSrc={imageSrc}
          getSrc={(src: string) => {
            setPixSrc(src)
          }} />}
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
          max={100}
          value={amount * 100}
          onInput={(event) => {
            setAmount(Math.ceil(Number(event.currentTarget.value)) / 100)
          }}
        />
        <p>
          像素化程度: {amount * 100}%
        </p>
      </div>
      <div>
        <button onClick={() => {
          const a = document.createElement('a')
          a.href = pixSrc
          a.download = 'pixel.png'
          a.click()
        }}>
          保存
        </button>
      </div>
    </div>
  )
}

export default PixOne
