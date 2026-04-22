import React, { useState, useEffect } from 'react';
import { MapPin, Search, Navigation, Compass, Map as MapIcon, Globe, Layers, Maximize2, History, Star, ZoomIn } from 'lucide-react';
import { useNotification } from '../../context/NotificationContext';
import './MapView.css';

const MapView = () => {
  const { addToast } = useNotification();
  const [address, setAddress] = useState('New Delhi, India');
  const [zoom, setZoom] = useState(13);
  const [mapType, setMapType] = useState(''); // Empty = Road, k = Satellite, p = Terrain
  const [history, setHistory] = useState(() => {
    const saved = localStorage.getItem('react-tools-map-history');
    return saved ? JSON.parse(saved) : ['Paris, France', 'Tokyo, Japan', 'New York, USA'];
  });


  const [mapUrl, setMapUrl] = useState('');

  useEffect(() => {
    const encoded = encodeURIComponent(address);
    setMapUrl(`https://maps.google.com/maps?q=${encoded}&t=${mapType}&z=${zoom}&ie=UTF8&iwloc=&output=embed`);
  }, [address, zoom, mapType]);

  const handleSearch = (e) => {
    if (e) e.preventDefault();
    if (!address.trim()) return;
    
    // Add to history if not exists
    if (!history.includes(address)) {
      const newHistory = [address, ...history.slice(0, 4)];
      setHistory(newHistory);
      localStorage.setItem('react-tools-map-history', JSON.stringify(newHistory));
    }
    addToast(`Exploring ${address}...`, 'success');
  };

  const setPreset = (loc) => {
    setAddress(loc);
    addToast(`Heading to ${loc}!`, 'info');
  };

  return (
    <div className="flex flex-col lg:flex-row gap-6 animate-in fade-in slide-in-from-top-6 duration-700 min-h-[700px] pb-20">
      
      {/* Explorer Sidebar */}
      <div className="lg:w-80 flex flex-col gap-6">
        <div className="glass-card p-6 space-y-6 border-none shadow-xl h-full">
            <div className="flex items-center gap-3">
               <History className="text-indigo-500" size={20} />
               <h3 className="text-sm font-black uppercase tracking-widest text-slate-500">Explorer History</h3>
            </div>
            
            <div className="space-y-2">
               {history.map((item, i) => (
                 <button 
                    key={i} 
                    onClick={() => setAddress(item)}
                    className="w-full text-left p-3 rounded-xl hover:bg-indigo-500/10 transition-all flex items-center gap-3 group"
                 >
                    <MapPin size={14} className="text-slate-400 group-hover:text-indigo-500" />
                    <span className="text-sm font-bold text-slate-600 dark:text-slate-300 truncate">{item}</span>
                 </button>
               ))}
            </div>

            <div className="pt-6 border-t border-slate-100 dark:border-slate-800 space-y-4">
                <div className="flex items-center gap-3">
                   <Star className="text-amber-500" size={20} />
                   <h3 className="text-sm font-black uppercase tracking-widest text-slate-500">Global Wonders</h3>
                </div>
                <div className="grid grid-cols-2 gap-2">
                    {['Eiffel Tower', 'Taj Mahal', 'Colosseum', 'Grand Canyon'].map(wonder => (
                      <button 
                        key={wonder} 
                        onClick={() => setPreset(wonder)}
                        className="p-2 text-[10px] font-black uppercase bg-slate-100 dark:bg-slate-800 hover:bg-amber-500 hover:text-white rounded-lg transition-all"
                      >
                        {wonder}
                      </button>
                    ))}
                </div>
            </div>
        </div>
      </div>

      {/* Main Map Engine */}
      <div className="flex-1 space-y-6">
          <div className="glass-card p-6 flex flex-col md:flex-row items-center gap-6 border-none shadow-xl">
             <form onSubmit={handleSearch} className="flex-1 flex gap-2 w-full">
                <div className="relative flex-1 group">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-indigo-500 transition-colors" />
                    <input
                        type="text"
                        placeholder="Explore the world..."
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        className="w-full pl-12 pr-4 py-4 bg-slate-50 dark:bg-slate-800/80 rounded-2xl dark:text-white outline-none focus:ring-2 focus:ring-indigo-500/20 text-sm font-bold transition-all"
                    />
                </div>
                <button type="submit" className="p-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl shadow-lg shadow-indigo-500/30 transition-all">
                    <Navigation size={20} />
                </button>
             </form>

             <div className="flex gap-2 p-1 bg-slate-100 dark:bg-slate-800 rounded-2xl">
                 <button onClick={() => setMapType('')} className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase transition-all ${mapType === '' ? 'bg-white dark:bg-slate-700 shadow-sm' : 'text-slate-500 hover:text-indigo-500'}`}>Map</button>
                 <button onClick={() => setMapType('k')} className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase transition-all ${mapType === 'k' ? 'bg-white dark:bg-slate-700 shadow-sm' : 'text-slate-500 hover:text-indigo-500'}`}>Satellite</button>
                 <button onClick={() => setMapType('p')} className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase transition-all ${mapType === 'p' ? 'bg-white dark:bg-slate-700 shadow-sm' : 'text-slate-500 hover:text-indigo-500'}`}>Terrain</button>
             </div>
          </div>

          <div className="glass-card p-2 h-[550px] border-none shadow-2xl relative overflow-hidden">
            <div className="absolute top-6 left-6 z-10 flex flex-col gap-2 p-2 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md rounded-2xl shadow-xl border border-white/20">
                <button onClick={() => setZoom(Math.min(zoom + 1, 21))} className="p-2 hover:bg-indigo-500 hover:text-white rounded-xl transition-all"><ZoomIn size={18} /></button>
                <div className="h-[1px] bg-slate-200 dark:bg-slate-700 mx-2" />
                <button onClick={() => setZoom(Math.max(zoom - 1, 1))} className="p-2 hover:bg-indigo-500 hover:text-white rounded-xl transition-all"><Maximize2 size={18} className="rotate-45" /></button>
            </div>

            <iframe
              title="Google Map"
              width="100%"
              height="100%"
              className="rounded-2xl border-none grayscale-[0.1] contrast-[1.05]"
              src={mapUrl}
              allowFullScreen
            ></iframe>
            
            <button 
                onClick={() => {
                    if (navigator.geolocation) {
                        addToast('Synchronizing with GPS...', 'info');
                        navigator.geolocation.getCurrentPosition((pos) => {
                            const { latitude, longitude } = pos.coords;
                            setAddress(`${latitude},${longitude}`);
                            addToast('Location Synced!', 'success');
                        });
                    }
                }}
                className="absolute bottom-6 right-6 p-5 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md rounded-2xl border border-white/20 shadow-2xl z-10 hover:scale-110 active:scale-95 transition-all group"
                title="Find My Current Location"
            >
               <Compass className="w-10 h-10 text-indigo-500 group-hover:rotate-45 transition-transform" />
               <span className="absolute -top-12 left-1/2 -translate-x-1/2 px-3 py-1 bg-indigo-600 text-white text-[10px] font-black uppercase rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap shadow-lg">
                  Sync Location
               </span>
            </button>

          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Stat label="Current View" value={address.split(',')[0]} icon={Globe} color="text-indigo-500" />
              <Stat label="Zoom Level" value={`${zoom}x Magnify`} icon={Maximize2} color="text-emerald-500" />
              <Stat label="Satellite Sync" value="Live & Active" icon={Layers} color="text-amber-500" />
              <Stat label="Engine" value="Google Pro" icon={MapIcon} color="text-rose-500" />
          </div>
      </div>
    </div>
  );
};

const Stat = ({ label, value, icon: Icon, color }) => (
    <div className="glass-card p-4 flex items-center gap-4 border-none shadow-lg">
        <div className={`p-2 rounded-xl bg-slate-50 dark:bg-slate-800/80 ${color}`}>
            <Icon size={18} />
        </div>
        <div className="overflow-hidden">
            <span className="block text-[9px] font-black uppercase text-slate-500 tracking-tighter">{label}</span>
            <span className="block text-xs font-bold dark:text-white truncate">{value}</span>
        </div>
    </div>
);

export default MapView;
