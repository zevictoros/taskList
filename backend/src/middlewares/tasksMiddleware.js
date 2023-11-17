const validateFieldTitle = (request, response, next) => {
    const { body } = request;
    if (body.title === undefined) {
        return response.status(400).json({ message: 'The fiels "title" is required' });
        
    }
    
    if (body.title === '') {
        return response.status(400).json({ message: 'Title cannot be empty' });
    }

    next();
};

const validateFieldStatus = (request, response, next) => {
    const { body } = request;
    
     if (body.status === undefined) {
         return response.status(400).json({ message: 'The fiels "Status" is required' });
     }
    
    if (body.status === '') {
        return response.status(400).json({ message: 'Status cannot be empty' });
    }

    next();
};

const validateFieldTecnico = (request, response, next) => {
    const { body } = request;

    if (body.tecnico === undefined) {
        return response.status(400).json({ message: 'The fiels "Tecnico" is required' });
    }

    if (body.tecnico === '') {
        return response.status(400).json({ message: 'Tecnico cannot be empty' });
    }

    next();
};

const validateFieldDate = (request, response, next) => {
    const { body } = request;

    if (body.marked_to === undefined) {
        return response.status(400).json({ message: 'The fiels "Date" is required' });
    }

    if (body.marked_to === '') {
        return response.status(400).json({ message: 'Date cannot be empty' });
    }

    next();
};

module.exports = {
    validateFieldTitle,
    validateFieldStatus,
    validateFieldTecnico,
    validateFieldDate
}