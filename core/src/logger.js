export function createLogDecorator(config = {}) {
  const { 
    level = 'INFO',
    transport = console, 
    formatter = JSON.stringify 
  } = config;

  return function logWrapper(fn) {
    return function (...args) {
      const startTime = performance.now();
      const timestamp = new Date().toISOString();

      const logResult = (status, resultOrError) => {
        const execTimeMs = (performance.now() - startTime).toFixed(2);
        const logData = { 
          timestamp, 
          level: status === 'ERROR' ? 'ERROR' : level, 
          function: fn.name || 'anonymous', 
          args, 
          status, 
          execTime: `${execTimeMs}ms`, 
          [status === 'ERROR' ? 'error' : 'result']: resultOrError 
        };
        
        const formatted = formatter(logData);

        if (status === 'ERROR') {
          transport.error(formatted);
        } else if (level !== 'ERROR') {
          transport.log(formatted);
        }
      };

      if (level === 'DEBUG') {
        transport.log(formatter({ 
          timestamp, 
          level: 'DEBUG', 
          status: 'ENTRY', 
          function: fn.name, 
          args 
        }));
      }

      try {
        const result = fn.apply(this, args);
        if (result && typeof result.then === 'function') {
          return result
            .then(res => { 
              logResult('SUCCESS', res); 
              return res; 
            })
            .catch(err => { 
              logResult('ERROR', err.message); 
              throw err; 
            });
        }
        logResult('SUCCESS', result);
        return result;
      } catch (err) {
        logResult('ERROR', err.message);
        throw err;
      }
    };
  };
}