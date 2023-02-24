const formatDate = (data) => {
        const date = new Date(data);
        const newFormat = date.toLocaleDateString("fr");
        return newFormat
    }

export {formatDate}