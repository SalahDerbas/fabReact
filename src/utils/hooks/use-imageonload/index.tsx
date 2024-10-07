import { useState } from "react"
import { ImageOnLoadType, ImageStyle } from "src/core/interface"

export const useImageOnLoad = (): ImageOnLoadType => {
  const [isLoaded, setIsLoaded] = useState<boolean>(false)

  // Triggered when full image will be loaded.
  const handleImageOnLoad = () => {
    setIsLoaded(true)
  }

  const css: ImageStyle = {
    // Thumbnail style.
    thumbnail: {
      visibility: isLoaded ? "hidden" : "visible",
      filter: "blur(8px)",
      transition: "visibility 0ms ease-out 2s",
    },
    // Full image style.
    fullSize: {
      opacity: 1,
      transition: "opacity 2s ease-in 0ms",
    },
  }

  return { handleImageOnLoad, css }
}

// example

//   const { handleImageOnLoad, css } = useImageOnLoad()

//   const style: { [key: string]: CSSProperties } = {
//     wrap: {
//       position: 'relative',
//       width: 600,
//       height: 600,
//     },
//     image: {
//       position: 'absolute',
//       width: `100%`,
//       height: `100%`,
//     },
//   }

//     <div style={style.wrap}>
//       {/* Small image load fast */}
//       <img
//         style={{ ...style.image, ...css.thumbnail }}
//         src="https://via.placeholder.com/150"
//         alt="thumbnail"
//       />
//       {/* Full size image */}
//       <img
//         onLoad={handleImageOnLoad}
//         style={{ ...style.image, ...css.fullSize }}
//         src="https://via.placeholder.com/600"
//         alt="fullImage"
//       />
//     </div>
