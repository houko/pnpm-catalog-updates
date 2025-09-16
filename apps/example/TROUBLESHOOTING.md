# Troubleshooting Guide

This guide helps you resolve common issues when using **pnpm-catalog-updates**.

## 🚨 Common Issues

### 1. Workspace Not Found

**Symptoms:**

- Error: "No pnpm workspace found"
- Error: "Invalid workspace configuration"

**Solutions:**

```bash
# Verify workspace structure
ls -la pnpm-workspace.yaml

# Check workspace configuration is valid
pcu workspace --validate

# Use explicit workspace path
pcu check --workspace /path/to/workspace

# Debug workspace discovery
DEBUG=pcu:* pcu workspace
```

**Common causes:**

- Missing `pnpm-workspace.yaml` file
- Invalid YAML syntax
- Incorrect packages glob patterns
- Workspace directory not readable

### 2. Network/Registry Issues

**Symptoms:**

- Error: "Network timeout"
- Error: "Registry not accessible"
- Error: "Package not found"

**Solutions:**

```bash
# Increase timeout
pcu check --timeout 60000

# Use specific registry
npm config set registry https://registry.npmjs.org/

# Check registry connectivity
npm ping

# Use offline mode with cache
pcu check --cache-only
```

**Proxy configuration:**

```bash
# Set proxy
npm config set proxy http://proxy.company.com:8080
npm config set https-proxy http://proxy.company.com:8080

# Configure for pnpm-catalog-updates
export HTTP_PROXY=http://proxy.company.com:8080
export HTTPS_PROXY=http://proxy.company.com:8080
```

### 3. Permission Errors

**Symptoms:**

- Error: "EACCES: permission denied"
- Error: "Cannot write to file"

**Solutions:**

```bash
# Check file permissions
ls -la pnpm-workspace.yaml
ls -la package.json

# Fix permissions
chmod 644 pnpm-workspace.yaml
chmod 644 package.json

# Use sudo if necessary (not recommended)
sudo chown -R $(whoami) .

# Run with different user
pcu check --workspace /path/to/workspace
```

### 4. Version Resolution Issues

**Symptoms:**

- Error: "Invalid version range"
- Error: "Cannot resolve version"
- Packages showing as outdated when they're not

**Solutions:**

```bash
# Clear npm cache
npm cache clean --force

# Clear pnpm cache
pnpm store prune

# Check package.json versions
npm ls react

# Debug version resolution
DEBUG=pcu:version pcu check
```

### 5. Memory Issues

**Symptoms:**

- Error: "JavaScript heap out of memory"
- Process killed unexpectedly

**Solutions:**

```bash
# Increase Node.js memory limit
NODE_OPTIONS="--max-old-space-size=4096" pcu check

# For very large workspaces
NODE_OPTIONS="--max-old-space-size=8192" pcu check

# Reduce parallel processing
pcu check --parallel 1

# Use streaming output
pcu check --format json > output.json
```

### 6. Color/Theme Issues

**Symptoms:**

- Colors not displaying correctly
- Terminal output looks broken

**Solutions:**

```bash
# Disable colors
pcu check --no-color

# Force color output
FORCE_COLOR=1 pcu check

# Use specific theme
pcu check --theme minimal

# Check terminal support
echo $TERM
echo $COLORTERM
```

### 7. Interactive Mode Issues

**Symptoms:**

- Prompts not displaying
- Arrow keys not working
- Selection not registering

**Solutions:**

```bash
# Use specific terminal
export TERM=xterm-256color

# Force non-interactive mode
pcu check --no-interactive

# Use alternative input method
echo "y" | pcu update

# Check terminal capabilities
tput -T $TERM longname
```

## 🔍 Debugging Guide

### Enable Debug Mode

```bash
# Enable all debug logging
DEBUG=pcu:* pcu check

# Enable specific modules
DEBUG=pcu:network,pcu:workspace,pcu:cache pcu check

# Enable timing information
DEBUG=pcu:* NODE_ENV=development pcu check
```

### Debug Categories

- `pcu:network` - Network requests and registry communication
- `pcu:workspace` - Workspace discovery and parsing
- `pcu:cache` - Cache operations and performance
- `pcu:version` - Version resolution and comparison
- `pcu:interactive` - Interactive prompts and user input
- `pcu:formatter` - Output formatting and styling

### Generate Debug Report

```bash
# Create comprehensive report
pcu workspace --validate --verbose 2> debug.log

# Include system information
node -e "console.log({node: process.version, platform: process.platform, arch: process.arch})" > system-info.json

# Package manager info
pnpm --version > pnpm-version.txt
npm --version > npm-version.txt
```

## 🛠️ Configuration Issues

### Configuration File Not Loading

**Check configuration locations:**

```bash
# Check current directory
ls -la .pcurc.json
ls -la pcu.config.js

# Check home directory
ls -la ~/.pcurc.json
ls -la ~/.config/pnpm-catalog-updates/config.json

# Check environment variables
env | grep PCU_
```

**Validate configuration:**

```bash
# Test configuration
pcu workspace --validate-config

# Debug configuration loading
DEBUG=pcu:config pcu check
```

### Configuration Validation Errors

**Common validation issues:**

```javascript
// Invalid JSON
{
  "defaults": {
    "timeout": "30"  // Should be number, not string
  }
}

// Missing required fields
{
  "update": {
    // Missing strategy field
  }
}

// Invalid values
{
  "output": {
    "format": "invalid"  // Must be: table, json, yaml, minimal
  }
}
```

## 🌐 Network Troubleshooting

### Registry Issues

**Test registry connectivity:**

```bash
# Test npm registry
npm ping

# Test specific package
npm view react version

# Check registry configuration
npm config get registry
pnpm config get registry

# Test with curl
curl https://registry.npmjs.org/react
```

### Proxy Issues

**Configure proxy settings:**

```bash
# npm configuration
npm config set proxy http://proxy.company.com:8080
npm config set https-proxy http://proxy.company.com:8080
npm config set no-proxy localhost,127.0.0.1,.company.com

# Environment variables
export HTTP_PROXY=http://proxy.company.com:8080
export HTTPS_PROXY=http://proxy.company.com:8080
export NO_PROXY=localhost,127.0.0.1,.company.com

# Test proxy
curl -x http://proxy.company.com:8080 https://registry.npmjs.org/react
```

### Corporate Firewall Issues

**Common corporate restrictions:**

- Blocked npm registry
- SSL certificate issues
- Rate limiting

**Solutions:**

```bash
# Use corporate registry
npm config set registry https://registry.company.com

# Skip SSL verification (not recommended)
npm config set strict-ssl false

# Use alternative registry
npm config set registry https://registry.npmmirror.com
```

## 📦 Package-Specific Issues

### Scoped Packages

**Issues with @scope/package:**

```bash
# Ensure authentication
npm login

# Check scope permissions
npm access ls-packages @myscope

# Debug scoped packages
DEBUG=pcu:network pcu check --include "@myscope/*"
```

### Private Packages

**Authentication issues:**

```bash
# Check npm authentication
npm whoami

# Configure authentication
npm login --registry=https://registry.npmjs.org/

# Use npmrc for credentials
echo "//registry.npmjs.org/:_authToken=${NPM_TOKEN}" > .npmrc
```

## 🔄 Cache Issues

### Clear Cache

```bash
# Clear npm cache
npm cache clean --force

# Clear pnpm cache
pnpm store prune

# Clear pnpm-catalog-updates cache
rm -rf ~/.cache/pnpm-catalog-updates
```

### Cache Location

```bash
# Find cache directory
pcu --help | grep cache

# Check cache usage
DEBUG=pcu:cache pcu check

# Set custom cache directory
export PCU_CACHE_DIR=/tmp/pcu-cache
```

## 🐛 Known Issues

### Issue: "Cannot find module" errors

**Solution:**

```bash
# Reinstall dependencies
npm install pnpm-catalog-updates

# Check Node.js version
node --version  # Should be >= 18.0.0

# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Issue: "pnpm-workspace.yaml not found" on Windows

**Solution:**

```bash
# Use forward slashes in paths
# Ensure file encoding is UTF-8
# Check for hidden extensions (.yaml.txt)
dir /a
```

### Issue: Slow performance on large workspaces

**Solutions:**

```bash
# Increase memory
NODE_OPTIONS="--max-old-space-size=4096" pcu check

# Reduce parallel processing
pcu check --parallel 1

# Use specific catalog
pcu check --catalog default

# Exclude heavy directories
pcu check --exclude "**/node_modules" --exclude "**/dist"
```

## 📊 Performance Issues

### Diagnosing Slow Performance

```bash
# Measure execution time
time pcu check

# Profile memory usage
node --inspect-brk $(which pcu) check

# Check for large directories
find . -name "node_modules" -type d -exec du -sh {} \;
find . -name "dist" -type d -exec du -sh {} \;
```

### Optimization Tips

1. **Exclude unnecessary directories:**

   ```json
   {
     "workspace": {
       "exclude": ["node_modules", "dist", ".git", "coverage"]
     }
   }
   ```

2. **Use specific catalogs:**

   ```bash
   pcu check --catalog prod
   ```

3. **Enable caching:**

   ```bash
   pcu check --cache
   ```

4. **Reduce parallel processing:**

   ```bash
   pcu check --parallel 1
   ```

## 📝 Getting Help

### Create Issue Report

When reporting issues, include:

1. **System information:**

   ```bash
   node --version
   npm --version
   pnpm --version
   pcu --version
   ```

2. **Debug output:**

   ```bash
   DEBUG=pcu:* pcu check 2> debug.log
   ```

3. **Configuration:**

   ```bash
   cat .pcurc.json 2>/dev/null || echo "No config file"
   ```

4. **Workspace structure:**

   ```bash
   tree -L 2 -I 'node_modules|dist'
   ```

### Community Support

- **GitHub Issues**:
  [Report bugs and feature requests](https://github.com/houko/pnpm-catalog-updates/issues)
- **Discussions**:
  [Join community discussions](https://github.com/houko/pnpm-catalog-updates/discussions)
- **Documentation**: [Read the docs](https://pcu-cli.dev)

## 🔗 Useful Commands

### Diagnostic Commands

```bash
# System information
node --version; npm --version; pnpm --version

# Test basic functionality
pcu --version
pcu workspace --validate

# Network connectivity test
npm ping

# Cache status
npm cache verify
pnpm store status

# File permissions check
ls -la pnpm-workspace.yaml
ls -la package.json
```

### Recovery Commands

```bash
# Reset to clean state
rm -rf node_modules pnpm-lock.yaml
pnpm install

# Clear all caches
npm cache clean --force
pnpm store prune

# Reinstall tool
npm install -g pcu@latest
```

Remember to always check the
[GitHub Issues](https://github.com/houko/pnpm-catalog-updates/issues) for the
latest known issues and solutions.
