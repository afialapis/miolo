import fs from 'node:fs'
import path from 'node:path'

/**
 * Updates docker-compose.yaml and Dockerfile with custom port
 */
export function updateDockerFiles(destPath, port) {
  // Update docker-compose.yaml
  const dockerComposePath = path.join(destPath, 'docker/docker-compose.yaml')
  if (fs.existsSync(dockerComposePath)) {
    let content = fs.readFileSync(dockerComposePath, 'utf8')
    // Replace port mapping (e.g., "8001:8001" -> "9000:9000")
    content = content.replace(/- "\d+:\d+"/g, `- "${port}:${port}"`)
    fs.writeFileSync(dockerComposePath, content, 'utf8')
  }

  // Update Dockerfile
  const dockerfilePath = path.join(destPath, 'docker/Dockerfile')
  if (fs.existsSync(dockerfilePath)) {
    let content = fs.readFileSync(dockerfilePath, 'utf8')
    // Replace EXPOSE port
    content = content.replace(/EXPOSE \d+/, `EXPOSE ${port}`)
    fs.writeFileSync(dockerfilePath, content, 'utf8')
  }
}
