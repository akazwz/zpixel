import React, { useEffect, useRef } from 'react'

interface Props {
  scale: number,
  srcURL: string,
  width: number,
  height: number,
  gray?: boolean,
  palette?: number[][],
  getPixURL: any,
}

const PixCanvas = (props: Props) => {
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

export default PixCanvas
