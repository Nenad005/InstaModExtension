function downloadInnerHtmlByClassName(className, filename) {
    const elements = document.getElementsByClassName(className);
    if (elements.length === 0) {
      console.error('No elements found with class name "' + className + '".');
      return;
    }
  
    let combinedHtml = '';
  
    for (const element of elements) {
      combinedHtml += element.innerHTML + '\n';
    }
  
    const blob = new Blob([combinedHtml], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
  
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
  
    document.body.appendChild(a);
    a.click();
  
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }
  
  // Replace 'elementsToDownload' with the actual class name of the elements and 'downloaded_content.html' with the desired filename
  downloadInnerHtmlByClassName('_ap3a _aaco _aacw _aacx _aad7 _aade', 'downloaded_content.html');
  