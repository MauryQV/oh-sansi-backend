const supabase = require('../../config/supabaseClient');
//const { get } = require('../routes/comidasRoutes');

const getComidas = async (req, res) => {
    try {
        const { data, error } = await supabase
            .from('comidas')
            .select('*');

        if (error) {
            console.error('Error al consultar Supabase:', error);
            throw error;
        }

        res.json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const createComida = async (req, res) => {
    try {
        const { nombre, descripcion, precio } = req.body;

        if (!nombre || !precio || !descripcion) {
            return res.status(400).json({ error: 'Nombre y precio son requeridos' });
        }

        const { data, error } = await supabase.from('comidas').insert([{ nombre, descripcion, precio }]);

        if (error) throw error;

        res.status(201).json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const updateComida = async (req, res) => {
    try {
        const { id } = req.params;
        const { nombre, descripcion, precio } = req.body; // Datos nuevos


        if (!id) return res.status(400).json({ error: 'ID es requerido' });
        if (!nombre && !precio && !descripcion) return res.status(400).json({ error: 'Debe proporcionar al menos un campo para actualizar' });


        let updateData = {};
        if (nombre) updateData.nombre = nombre;
        if (descripcion) updateData.descripcion = descripcion;
        if (precio) updateData.precio = precio;


        // Ejecutar la actualización en Supabase
        const { data, error } = await supabase
            .from('comidas')
            .update(updateData)
            .eq('id', id)
            .select('*'); // Devuelve los datos actualizados

        if (error) throw error;


        if (data.length === 0) {
            return res.status(404).json({ error: 'Comida no encontrada' });
        }

        res.json({ mensaje: 'Comida actualizada con éxito', data });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const deleteComida = async (req, res) => {
    try {
        const { id } = req.params;


        if (!id) return res.status(400).json({ error: 'ID es requerido' });

        //eliminar la comida
        const { data, error } = await supabase
            .from('comidas')
            .delete()
            .eq('id', id)

            .select('*'); // forzamos a devolver el registro eliminado

        if (error) throw error;

        // Si no encuentra el ID
        if (data.length === 0) {
            return res.status(404).json({ error: 'Comida no encontrada' });
        }

        res.json({ mensaje: 'se ha eliminado con éxito', data });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getComidaById = async (req, res) => {
    try {
        const { id } = req.params;

        if (!id) return res.status(400).json({ error: 'ID es requerido' });

        const { data, error } = await supabase
            .from('comidas')
            .select('*')
            .eq('id', id);

        if (error) throw error;

        if (data.length === 0) {
            return res.status(404).json({ error: 'Comida no encontrada' });
        }

        res.json(data[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }


};
module.exports = {
    getComidas,
    createComida,
    updateComida,
    deleteComida,
    getComidaById,

};