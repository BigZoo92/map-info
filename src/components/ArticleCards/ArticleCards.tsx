import { useRef } from 'react'
import { useOnClickOutside } from 'usehooks-ts'
import useStore from '../../store/useStore'
import { colors } from '../../style/styles'

export const customLoader = ({ src }: { src: string }) => {
  return src
}

function formatDate(date: Date): string {
  return date.toLocaleDateString('fr-FR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  })
}

export default function ArticleCards() {
  const { articles, closePopup } = useStore()
  const popupRef = useRef(null)

  useOnClickOutside(popupRef, () => closePopup())

  return (
    <section
      ref={popupRef}
      style={{
        width: 'clamp(250px, 80dvw, 1500px)',
        height: '80dvh',
        overflowY: 'auto',
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
        padding: '10px',
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        background: colors.black.default,
        color: colors.white.default,
        borderRadius: '12px',
        border: `10px solid ${colors.black.default}`,
      }}
    >
      {articles && articles.length === 0 ? (
        <h1>No Article for this countries</h1>
      ) : (
        articles?.map((article, index) => (
          <div
            key={index}
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              padding: '10px',
              gap: '10px',
            }}
          >
            {article.urlToImage && (
              <img
                src={article.urlToImage}
                alt={article.description ? article.description : ''}
                width={'40%'}
                style={{
                  borderRadius: '12px',
                }}
              />
            )}
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'column',
                gap: 10,
              }}
            >
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  width: '100%',
                }}
              >
                <div>
                  <h3
                    style={{
                      fontSize: 'clamp(1.25rem, 2vw, 1.75rem)',
                      fontWeight: 700,
                    }}
                  >
                    {article.title}
                  </h3>
                  <span
                    style={{
                      fontSize: 'clamp(1rem, 1.5vw, 1.25rem)',
                      fontWeight: 300,
                      fontStyle: 'italic',
                    }}
                  >
                    {article.source.name}
                  </span>
                </div>
                <span>{formatDate(new Date(article.publishedAt))}</span>
              </div>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 10,
                }}
              >
                <p
                  style={{
                    fontSize: 'clamp(0.75rem, 1vw, 1rem)',
                    fontWeight: 200,
                    color: colors.white.dark,
                    lineHeight: 1.5,
                    letterSpacing: 0.75,
                  }}
                >
                  {article.description}
                </p>
                <a
                  target="_blank"
                  href={article.url}
                  style={{
                    background: 'purple',
                    color: 'white',
                    padding: 5,
                    width: '100px',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: '12px',
                  }}
                >
                  click here
                </a>
              </div>
            </div>
          </div>
        ))
      )}
    </section>
  )
}
