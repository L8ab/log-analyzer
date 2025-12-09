const fs = require('fs');
const readline = require('readline');

class LogAnalyzer {
  async analyzeLogFile(filePath) {
    const fileStream = fs.createReadStream(filePath);
    const rl = readline.createInterface({
      input: fileStream,
      crlfDelay: Infinity
    });
    
    const stats = {
      totalLines: 0,
      errors: [],
      warnings: [],
      info: []
    };
    
    for await (const line of rl) {
      stats.totalLines++;
      
      if (line.includes('ERROR')) {
        stats.errors.push({ line: stats.totalLines, content: line });
      } else if (line.includes('WARN')) {
        stats.warnings.push({ line: stats.totalLines, content: line });
      } else if (line.includes('INFO')) {
        stats.info.push({ line: stats.totalLines, content: line });
      }
    }
    
    return stats;
  }
}

module.exports = new LogAnalyzer();
