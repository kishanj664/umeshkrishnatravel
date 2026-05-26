import { useState, useEffect } from 'react';
import { CreditCard, MapPin, Calendar, Clock, ChevronRight, CheckCircle2, XCircle, AlertCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

interface Booking {
  id: number;
  status: 'pending' | 'accepted' | 'rejected';
  paymentStatus: 'pending' | 'paid';
  price: number;
  details: {
    pickup: string;
    drop: string;
    date: string;
    time: string;
    vehicleName: string;
    bookingType: string;
  };
}

export default function CustomerBookings() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    if (user) fetchBookings();
  }, [user]);

  const fetchBookings = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/bookings/customer/${user?.id}`);
      const data = await response.json();
      setBookings(data.reverse()); // Newest first
    } catch (error) {
      console.error('Error fetching bookings:', error);
    } finally {
      setLoading(false);
    }
  };

  const handlePayment = async (id: number) => {
    try {
      await fetch(`http://localhost:5000/api/bookings/${id}/pay`, {
        method: 'PUT',
      });
      alert('Payment Successful!');
      fetchBookings();
    } catch (error) {
      alert('Payment failed. Please try again.');
    }
  };

  if (loading) return <div className="text-center py-10 text-navy font-bold">Loading your trips...</div>;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between text-navy">
        <h2 className="text-2xl font-bold">My Bookings</h2>
        <span className="text-sm font-medium text-slate-500">{bookings.length} trips found</span>
      </div>

      <div className="grid gap-4">
        {bookings.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center border-2 border-dashed border-slate-100">
            <p className="text-slate-400 font-medium">You haven't booked any trips yet.</p>
          </div>
        ) : (
          bookings.map((booking) => (
            <div key={booking.id} className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 hover:shadow-md transition-shadow group text-navy">
              <div className="flex flex-col md:flex-row justify-between gap-6">
                <div className="flex-1 space-y-4">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-xl ${
                      booking.status === 'accepted' ? 'bg-emerald-50 text-emerald-600' :
                      booking.status === 'rejected' ? 'bg-red-50 text-red-600' :
                      'bg-gold/10 text-gold'
                    }`}>
                      {booking.status === 'accepted' ? <CheckCircle2 className="w-5 h-5" /> :
                       booking.status === 'rejected' ? <XCircle className="w-5 h-5" /> :
                       <AlertCircle className="w-5 h-5" />}
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                        Booking #{booking.id} • {booking.details.bookingType.replace('_', ' ')}
                      </p>
                      <h3 className="text-lg font-bold text-navy">
                        {booking.details.pickup} <ChevronRight className="inline w-4 h-4 text-gold mx-1" /> {booking.details.drop}
                      </h3>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 font-medium">
                    <div className="flex items-center gap-2 text-slate-500">
                      <Calendar className="w-4 h-4 text-gold" />
                      <span className="text-sm">{booking.details.date}</span>
                    </div>
                    <div className="flex items-center gap-2 text-slate-500">
                      <Clock className="w-4 h-4 text-gold" />
                      <span className="text-sm">{booking.details.time}</span>
                    </div>
                    <div className="flex items-center gap-2 text-slate-500">
                      <MapPin className="w-4 h-4 text-gold" />
                      <span className="text-sm">{booking.details.vehicleName}</span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-row md:flex-col justify-between items-center md:items-end gap-4 border-t md:border-t-0 md:border-l border-slate-100 pt-4 md:pt-0 md:pl-6">
                  <div className="text-right">
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Total Fare</p>
                    <p className="text-2xl font-black text-navy">₹{booking.price}</p>
                  </div>

                  <div className="flex flex-col items-end gap-2">
                    <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                      booking.paymentStatus === 'paid' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'
                    }`}>
                      {booking.paymentStatus}
                    </span>
                    
                    {booking.paymentStatus === 'pending' && booking.status === 'accepted' && (
                      <button
                        onClick={() => handlePayment(booking.id)}
                        className="flex items-center gap-2 bg-navy text-white px-4 py-2 rounded-xl text-sm font-bold hover:bg-navy-light transition-all shadow-lg shadow-navy/10"
                      >
                        <CreditCard className="w-4 h-4" />
                        Pay Now
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}