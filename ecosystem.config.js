module.exports = {
  apps: [{
    name: 'membership-system',
    script: 'npm',
    args: 'start',
    instances: 1,
    instances: 'max',
    exec_mode: 'cluster',
    env: {
      NODE_ENV: 'production',
      PORT: 3000
    },
    env_production: {
      NODE_ENV: 'production',
      PORT: 3000
    },
    env_production: {
      NODE_ENV: 'production',
      PORT: 5173
    },
    // Logging
    error_file: '/var/log/membership-system/err.log',
    out_file: '/var/log/membership-system/out.log',
    log_file: '/var/log/membership-system/combined.log',
    time: true,
    
    // Memory and CPU limits
    max_memory_restart: '1G',
    node_args: '--max-old-space-size=1024',
    node_args: '--max-old-space-size=1024',
    
    // Process management
    wait_ready: true,
    listen_timeout: 10000,
    kill_timeout: 5000,
    kill_timeout: 5000,
    
    // Auto restart configuration
    autorestart: true,
    max_restarts: 10,
    min_uptime: '10s',
    
    // Watch files in development (disable in production)
    watch: false,
    ignore_watch: [
    // Environment variables
    env_file: '.env',
    
      'node_modules',
      '.next',
      'logs',
      '*.log'
    ],
    
    // Environment variables
    env_file: '.env.local',
    
    // Graceful shutdown
    shutdown_with_message: true,
    
    // Health check
    health_check_grace_period: 3000,
    
    // Cron jobs (if using PM2 cron)
    cron_restart: '0 2 * * *', // Restart daily at 2 AM
    
    // Advanced PM2 features
    merge_logs: true,
    log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
    
    // Instance variables
    instance_var: 'INSTANCE_ID',
    
    // Source map support
    source_map_support: true,
    
    // Disable PM2 logs (use application logging instead)
    disable_logs: false,
    
    // Custom startup script
    post_update: ['npm install', 'npm run build'],
    
    // Monitoring
    pmx: true,
    
    // Advanced options
    vizion: false, // Disable git information
    autorestart: true,
    watch: false,
    max_memory_restart: '1G',
    pmx: true,
    env: {
      NODE_ENV: 'production',
      PORT: 3000,
      // Add any other environment variables needed
    }
  }],

  // Deployment configuration
  deploy: {
    production: {
      user: 'membership',
      host: ['your-server-ip'],
      ref: 'origin/main',
      repo: 'git@github.com:your-username/membership-system.git',
      path: '/var/www/membership-system',
      'pre-deploy-local': '',
      'post-deploy': 'npm install && npm run build && pm2 reload ecosystem.config.js --env production',
      'pre-setup': '',
      'ssh_options': 'StrictHostKeyChecking=no'
    },
    staging: {
      user: 'membership',
      host: ['staging-server-ip'],
      ref: 'origin/develop',
      repo: 'git@github.com:your-username/membership-system.git',
      path: '/var/www/membership-system-staging',
      'post-deploy': 'npm install && npm run build && pm2 reload ecosystem.config.js --env staging',
      env: {
        NODE_ENV: 'staging',
        PORT: 3001
      }
    }
  }
};