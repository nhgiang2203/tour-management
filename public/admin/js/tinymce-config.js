const listTextareaMCE = document.querySelectorAll("[textarea-mce]");

if (listTextareaMCE.length > 0) {
  listTextareaMCE.forEach((textarea) => {
    const id = textarea.id;
    tinymce.init({
      selector: `#${id}`,
      plugins: "image code",
      image_title: true,
      automatic_uploads: true,
      file_picker_types: "image",
      images_upload_url: "/admin/upload"
      
    });
  });
}