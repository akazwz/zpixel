import React, { useEffect, useRef } from 'react'

const CanvasI = (props: any) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  useEffect(() => {
    if (!canvasRef.current) {
      console.log('canvas is null')
      return
    }
    const canvas = canvasRef.current
    const context = canvas.getContext('2d')
    if (!context) {
      console.log('context is null')
      return
    }
    console.log('start canvas')
    context.beginPath()
    //context.arc(50, 50, 50, 0, 2 * Math.PI)
    context.fillText('some', 60, 60)
    context.fill()
  })

  return (
    <canvas ref={canvasRef} height={500} width={500} />
  )
}

const Pix = () => {
  useEffect(() => {

  })
  return (
    <>
      <CanvasI />
    </>
  )
}

export default Pix
