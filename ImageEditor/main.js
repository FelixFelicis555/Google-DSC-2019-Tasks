const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

let img = new Image();
let fileName = '';

const downloadBtn = document.getElementById('download-btn');
const uploadFile = document.getElementById('upload-file');
const revertBtn = document.getElementById('revert-btn');


document.addEventListener('click', (e) => {
    if (e.target.classList.contains('filter-btn')) {
        if (e.target.classList.contains('brightness-add')) {
            Caman('#canvas', img, function() {
                this.brightness(10).render();
            })
        } else if (e.target.classList.contains('brightness-remove')) {
            Caman('#canvas', img, function() {
                this.brightness(-10).render();
            })
        } else if (e.target.classList.contains('contrast-add')) {
            Caman('#canvas', img, function() {
                this.contrast(10).render();
            })
        } else if (e.target.classList.contains('contrast-remove')) {
            Caman('#canvas', img, function() {
                this.contrast(-10).render();
            })
        } else if (e.target.classList.contains('saturation-add')) {
            Caman('#canvas', img, function() {
                this.saturation(10).render();
            })
        } else if (e.target.classList.contains('saturation-remove')) {
            Caman('#canvas', img, function() {
                this.saturation(-10).render();
            })
        } else if (e.target.classList.contains('vibrance-add')) {
            Caman('#canvas', img, function() {
                this.vibrance(10).render();
            })
        } else if (e.target.classList.contains('vibrance-remove')) {
            Caman('#canvas', img, function() {
                this.vibrance(-10).render();
            })
        }
    }
})

	revertBtn.addEventListener('click', (e) => {
		Caman('#canvas', img, function() {
			this.revert();
		});
	});

// Download Button
	downloadBtn.addEventListener('click', (e) => {
		
		const fileExtension = fileName.slice(-4);

		let newFileName;

		if(fileExtension === '.jpg' || fileExtension === '.png') {
			newFileName = fileName.substring(0, fileName.length - 4) + '-edited.jpg';
		}
	download(canvas, newFileName)
	})

	// Call download
	function download(canvas, filename) {
		let e;
		const link = document.createElement('a');
		link.download = filename;
		link.href = canvas.toDataURL('image/jpeg', 0.8);
		
		e = new MouseEvent('click');
		
		link.dispatchEvent(e);

	}


// Upload File
uploadFile.addEventListener('change', (e) => {
    
    const file = document.getElementById('upload-file').files[0];

    
    const reader = new FileReader();

    if (file) {
        
        fileName = file.name;
        
        reader.readAsDataURL(file);
    }

    //Add image to canvas
    reader.addEventListener(
        'load',
        () => {
            // Create img
            img = new Image();
            
            img.src = reader.result;
            
            img.onload = function() {
                canvas.width = img.width;
                canvas.height = img.height;
                ctx.drawImage(img, 0, 0, img.width, img.height);
                canvas.removeAttribute('data-caman-id');
            }
        },
        false);
});