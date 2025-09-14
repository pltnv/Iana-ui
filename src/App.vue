<template>
  <div class="container">
    <div class="hero">
      <h1 class="title">Iana-UI</h1>
      <p class="subtitle">Vue 3 Component Library</p>

      <div class="instructions">
        <h2>Getting Started</h2>
        <p>To start the Storybook and explore components:</p>

        <div class="code-block">
          <pre><code>yarn storybook dev</code></pre>
        </div>

        <p>or</p>

        <div class="code-block">
          <pre><code>npx storybook dev -p 9009</code></pre>
        </div>

        <p class="note">Then follow your console</p>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.container {
  min-height: 100vh;
  background: linear-gradient(135deg, #1e1e1e 0%, #2d2d2d 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, sans-serif;

  .hero {
    text-align: center;
    color: white;
    max-width: 600px;

    .title {
      font-size: 3.5rem;
      font-weight: 700;
      margin-bottom: 0.5rem;
      background: linear-gradient(135deg, #ff4785 0%, #ff6b9c 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }

    .subtitle {
      font-size: 1.2rem;
      color: #cccccc;
      margin-bottom: 3rem;
    }

    .instructions {
      background: rgba(255, 255, 255, 0.05);
      border-radius: 12px;
      padding: 2rem;
      backdrop-filter: blur(10px);
      border: 1px solid rgba(255, 255, 255, 0.1);

      h2 {
        margin-top: 0;
        color: #ffffff;
        font-size: 1.5rem;
        margin-bottom: 1rem;
      }

      p {
        color: #cccccc;
        margin-bottom: 1.5rem;
        line-height: 1.5;
      }

      .code-block {
        background: #2d2d2d;
        border-radius: 6px;
        padding: 1rem;
        margin: 1rem 0;
        border: 1px solid #404040;

        pre {
          margin: 0;
          overflow-x: auto;

          code {
            color: #f8f8f2;
            font-family: "Monaco", "Menlo", "Ubuntu Mono", monospace;
            font-size: 0.9rem;
            line-height: 1.4;
          }
        }
      }

      .note {
        font-size: 0.9rem;
        color: #888888;
        margin-top: 2rem;

        a {
          color: #ff6b9c;
          text-decoration: none;

          &:hover {
            text-decoration: underline;
          }
        }
      }
    }
  }
}

@media (max-width: 768px) {
  .container {
    .hero {
      .title {
        font-size: 2.5rem;
      }

      .instructions {
        padding: 1.5rem;

        .code-block {
          pre code {
            font-size: 0.8rem;
          }
        }
      }
    }
  }
}
</style>