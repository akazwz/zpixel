import React, {useEffect, useRef, useState} from 'react'

const PixelPic = (props: { amount: number, imageSrc: string, width: number, height: number }) => {
    const {amount, imageSrc, width, height} = props
    const imageRef = useRef<HTMLImageElement>(null)
    const [pixImgSrc, setPixImgSrc] = useState(imageSrc)

    const getPixelImageUrl = () => {
        const canvas = document.createElement('canvas')
        canvas.style.display = 'block'
        canvas.width = width
        canvas.height = height
        const ctx = canvas.getContext('2d')
        if (ctx) {
            ctx.imageSmoothingEnabled = false
            const w = width * (amount <= 0 ? 0.01 : amount)
            const h = height * (amount <= 0 ? 0.01 : amount)
            const pixelImage = new Image()
            pixelImage.setAttribute('crossOrigin', 'anonymous')
            pixelImage.src = imageSrc
            // 小图
            ctx.drawImage(pixelImage, 0, 0, w, h)
            ctx.drawImage(canvas, 0, 0, w, h, 0, 0, width, height)
            return canvas.toDataURL('image/png')
        }
        return ''
    }

    useEffect(() => {
        if (imageRef.current) {
            const image = imageRef.current
            if (image.complete) {
                const url = getPixelImageUrl()
                setPixImgSrc(url)
            } else {
                image.onload = () => {
                    const onloadUrl = getPixelImageUrl()
                    setPixImgSrc(onloadUrl)
                }
            }
        }
    })

    return (
        <div>
            <img
                ref={imageRef}
                src={pixImgSrc}
                width={width}
                height={height}
                crossOrigin='anonymous'
                alt='link'
            />
        </div>
    )
}

export default PixelPic
