import { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import modelUrl from '../source/weed_plant_medium_2.glb?url'

const MODEL_URL = modelUrl

function PlantPreview3D() {
  const mountRef = useRef(null)
  const [loadError, setLoadError] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const mountEl = mountRef.current
    if (!mountEl) return undefined

    const scene = new THREE.Scene()
    scene.background = new THREE.Color('#f5efdf')

    const camera = new THREE.PerspectiveCamera(
      45,
      mountEl.clientWidth / mountEl.clientHeight,
      0.1,
      100,
    )
    camera.position.set(0.1, 0.45, 1.2)

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setSize(Math.max(mountEl.clientWidth, 1), Math.max(mountEl.clientHeight, 1), false)
    renderer.outputColorSpace = THREE.SRGBColorSpace
    renderer.domElement.style.width = '100%'
    renderer.domElement.style.height = '100%'
    renderer.domElement.style.display = 'block'
    mountEl.appendChild(renderer.domElement)

    const controls = new OrbitControls(camera, renderer.domElement)
    controls.enableDamping = true
    controls.enablePan = false
    controls.maxDistance = 5
    controls.minDistance = 0.25
    controls.target.set(0, 0.35, 0)

    scene.add(new THREE.HemisphereLight('#fff7e8', '#8ea588', 1.1))

    const keyLight = new THREE.DirectionalLight('#fff1d3', 1.35)
    keyLight.position.set(2.5, 4, 3)
    scene.add(keyLight)

    const fillLight = new THREE.DirectionalLight('#bdd6b8', 0.9)
    fillLight.position.set(-2.5, 2.5, -1)
    scene.add(fillLight)

    const loader = new GLTFLoader()
    let modelGroup = null
    const fallbackMaterial = new THREE.MeshStandardMaterial({
      color: '#5f8b4e',
      roughness: 0.85,
      metalness: 0.02,
    })

    loader.load(
      MODEL_URL,
      (gltf) => {
        setLoadError(false)
        setIsLoading(false)

        const model = gltf.scene

        model.traverse((child) => {
          if (!child.isMesh) return
          child.castShadow = false
          child.receiveShadow = true

          if (!child.material) {
            child.material = fallbackMaterial
          }

          if (Array.isArray(child.material)) {
            child.material.forEach((material) => {
              if (material?.map) material.map.colorSpace = THREE.SRGBColorSpace
              if (!material?.map && material?.color) material.color.convertSRGBToLinear()
              if (material) material.side = THREE.DoubleSide
            })
          } else if (child.material) {
            if (child.material.map) child.material.map.colorSpace = THREE.SRGBColorSpace
            child.material.side = THREE.DoubleSide
          }
        })

        const box = new THREE.Box3().setFromObject(model)
        if (box.isEmpty()) {
          setLoadError(true)
          setIsLoading(false)
          return
        }

        const size = box.getSize(new THREE.Vector3())
        const center = box.getCenter(new THREE.Vector3())

        const targetHeight = 0.95
        const currentHeight = size.y || 1
        const scale = targetHeight / currentHeight
        model.scale.setScalar(scale)

        model.position.set(-center.x * scale, -box.min.y * scale, -center.z * scale)
        model.rotation.y = -0.5

        const scaledSize = size.multiplyScalar(scale)
        const maxDim = Math.max(scaledSize.x, scaledSize.y, scaledSize.z)
        const fov = THREE.MathUtils.degToRad(camera.fov)
        const distance = Math.max((maxDim * 0.75) / Math.tan(fov / 2), 0.85)

        camera.position.set(distance * 0.22, targetHeight * 0.6, distance * 1.05)
        camera.near = Math.max(distance / 200, 0.01)
        camera.far = distance * 20
        camera.updateProjectionMatrix()

        controls.target.set(0, targetHeight * 0.45, 0)
        controls.minDistance = Math.max(distance * 0.45, 0.2)
        controls.maxDistance = distance * 2.6
        controls.update()

        scene.add(model)
        modelGroup = model
      },
      undefined,
      (error) => {
        console.error('Failed to load 3D model', error)
        setLoadError(true)
        setIsLoading(false)
      },
    )

    let rafId = 0
    const animate = () => {
      rafId = requestAnimationFrame(animate)
      if (modelGroup) modelGroup.rotation.y += 0.002
      controls.update()
      renderer.render(scene, camera)
    }
    animate()

    const onResize = () => {
      if (!mountEl) return
      const { width, height } = mountEl.getBoundingClientRect()
      const safeWidth = Math.max(width, 1)
      const safeHeight = Math.max(height, 1)
      camera.aspect = safeWidth / safeHeight
      camera.updateProjectionMatrix()
      renderer.setSize(safeWidth, safeHeight, false)
    }

    const resizeObserver = new ResizeObserver(onResize)
    resizeObserver.observe(mountEl)
    onResize()

    window.addEventListener('resize', onResize)

    return () => {
      cancelAnimationFrame(rafId)
      window.removeEventListener('resize', onResize)
      resizeObserver.disconnect()
      controls.dispose()
      fallbackMaterial.dispose()
      renderer.dispose()
      if (renderer.domElement.parentNode === mountEl) {
        mountEl.removeChild(renderer.domElement)
      }
    }
  }, [])

  return (
    <div className="plant-preview-canvas" ref={mountRef}>
      {isLoading && <p className="plant-preview-status">Loading 3D model...</p>}
      {loadError && (
        <p className="plant-preview-error">Unable to load 3D model preview.</p>
      )}
    </div>
  )
}

export default PlantPreview3D
