'use client'

import useStore from '../../store/useStore'

export const customLoader = ({ src }: { src: string }) => {
  return src
}

export default function () {
  const { articles } = useStore()
  if (!articles) return
  return (
    <section
      style={{
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
        padding: '10px',
      }}
    >
      {articles.length === 0 ? (
        <h1>No Article for this countries</h1>
      ) : (
        articles.map((article, index) => (
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
                  <h3>{article.title}</h3>
                  <span>{article.source.name}</span>
                </div>
                <span>{article.publishedAt}</span>
              </div>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 10,
                }}
              >
                <p>{article.description}</p>
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
